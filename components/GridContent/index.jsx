import React from "react";

import Map from "../Map";

import OnlineYesAddCamerasNo from "../OnlineYesAddCamerasNo";

import FirstPageYes from "../FirstPageYes";

import "./GridContent.sass";

class GridContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nodes: {},
      streamingNodes: {}
    }

    this.refreshRecentlyCheckedIn()

    this.handleMapIconClick.bind(this)
    this.handleCloseStreamingNode.bind(this)
    this.wireUpStream.bind(this)
  }

  static defaultProps = {
    nodes: {},
    streamingNodes: {}
  }

  refreshRecentlyCheckedIn() {
    var nodeHash = {}

    fetch(`http://${process.env.API_HOST_AND_PORT || 'localhost:3000'}/api/nodes/recentlyCheckedIn`)
      .then((response) => response.json())
      .then( (json) => {
        json.forEach(node => {
          nodeHash[node.name] = node;

          node.config.cameras.forEach(camera => {
            var streamName = camera.humanReadableName;
            var streamID = streamName.replaceAll(/\s/g, "-");

            var requestBody = {
              "uuid": streamID,
              "name": streamName,
                "channels": {
                  "0": {
                    "url": `${camera.rtspURL}`,
                    "on_demand": true,
                    "debug": false,
                  }
                }
            };

            var requestOptions = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(requestBody)
            };

            fetch(`http://${process.env.RTSPTOWEB_HOST_AND_PORT || 'localhost:8083'}/stream/${streamID}/add`, requestOptions);
          });
        });

        this.setState({
          nodes: nodeHash
        });
      });
  }

  handleMapIconClick = (e) => {
    var clickedNode = {};

    clickedNode = this.state.nodes[e.target.dataset.name];

    clickedNode.config.cameras.forEach(camera => {
      camera.reference = React.createRef();
      camera.mediaStream = new MediaStream();
    });

    var tempStreamingNodes = this.state.streamingNodes;

    tempStreamingNodes[clickedNode.name] = clickedNode
    
    this.setState({
      streamingNodes: tempStreamingNodes
    })
  }

  handleCloseStreamingNode = (e) => {
    var clickedNode = {};

    clickedNode = this.state.nodes[e.target.dataset.name];

    var tempStreamingNodes = this.state.streamingNodes;

    delete(tempStreamingNodes[clickedNode.name])

    this.setState({
      streamingNodes: tempStreamingNodes
    });
  }

  wireUpStream(camera) {
    let videoPlayer = camera.reference;

    let stream = camera.mediaStream;

    let config = {
      iceServers: [{
        urls: ["stun:stun.l.google.com:19302"]
      }]
    };

    let pc = new RTCPeerConnection(config);

    pc.onnegotiationneeded = async () => {
      let offer = await pc.createOffer();

      await pc.setLocalDescription(offer);

      let receiverUrl = `http://${process.env.RTSPTOWEB_HOST_AND_PORT || 'localhost:8083'}/stream/${camera.humanReadableName.replaceAll(/\s/g, '-')}/channel/0/webrtc`;

      fetch(receiverUrl, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          data: btoa(pc.localDescription.sdp)
        })
      })
      .then( (data) => {

        data.text().then(function(blob) {

          try {
            pc.setRemoteDescription(new RTCSessionDescription({
              type: 'answer',
              sdp: atob(blob)
            }))
          } catch (e) {
            console.warn(e);
          }

        });

      })
      .catch(function(e) {
        console.log(e);
      });
    }

    pc.ontrack = function(event) {
      stream.addTrack(event.track);
      videoPlayer.current.srcObject = stream;
    }

    pc.addTransceiver('video', { 'direction': 'sendrecv' })
  }

  render() {

    return (
      <div className="grid-content">

        <Map nodes={this.state.nodes} handleClick={this.handleMapIconClick} />

        <div className="camera-navigation">

          { Object.keys(this.state.streamingNodes).reverse().map( (name) => { 

            var streamingNode = this.state.streamingNodes[name];

            return <OnlineYesAddCamerasNo 
                      cameras={streamingNode.config.cameras}
                      wireUpStream={this.wireUpStream}
                      handleClose={this.handleCloseStreamingNode} 
                      key={name} 
                      name={name} 
                      nodeIPAddress={streamingNode.config.ip}
              />
          } ) }
        </div>
      </div>
    );
  }
}

export default GridContent;
