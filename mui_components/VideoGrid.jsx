import React from "react";
import "./VideoGrid.sass";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

class VideoGrid extends React.Component {
  constructor(props) {
    super(props);

    props.nodeConfig.cameras.forEach(camera => {
      if(camera.reference == null) {
        camera.reference = React.createRef();
        camera.mediaStream = new MediaStream();
      }
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

    if(camera.pc == null) {
      camera.pc = new RTCPeerConnection(config);
    }

    camera.pc.onnegotiationneeded = async () => {
      let offer = await camera.pc.createOffer();

      await camera.pc.setLocalDescription(offer);

      let receiverUrl = `http://${process.env.RTSPTOWEB_HOST_AND_PORT || 'localhost:8083'}/stream/${camera.humanReadableName.replaceAll(/\s/g, '-')}/channel/0/webrtc`;

      fetch(receiverUrl, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          data: btoa(camera.pc.localDescription.sdp)
        })
      })
      .then( (data) => {

        data.text().then(function(blob) {

          try {
            camera.pc.setRemoteDescription(new RTCSessionDescription({
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

    camera.pc.ontrack = function(event) {
      stream.addTrack(event.track);
      camera.track = event.track;
      videoPlayer.current.srcObject = stream;
    }

    camera.pc.addTransceiver('video', { 'direction': 'sendrecv' })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(this.props.display && !prevProps.display) {
      console.log("Hook up the streams!");
      this.props.nodeConfig.cameras.forEach(camera => {
        this.wireUpStream(camera);
      });
    }

    if(!this.props.display && prevProps.display) {
      console.log("Shut down the streams!");
      this.props.nodeConfig.cameras.forEach(camera => {
        camera.mediaStream.removeTrack(camera.track);
        camera.pc = null;
      });
      console.log("Removed the stream");
    }
  }

  render() {
    return (
      <div style={ {display: this.props.display ? 'block' : 'none'} } className="video-grid">
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Button sx={ {border: "1px solid white" } }color="success" variant="contained" target="_blank" href={`http://${this.props.nodeConfig.ip}:7878/`}>Download Footage</Button> 
          </Grid>
          { this.props.nodeConfig.cameras.map( (camera) => {
            return <Grid item xs={4}>
              <Paper>
                <div className="videoContainer">
                  <h2>{camera.humanReadableName}</h2>
                  <div className="mediaPlayerContainer">
                    <video style={ {width: "100%", height: "100%"} } ref={camera.reference} key={camera.cameraNumber} controls autoPlay />
                  </div>
                  <div className="buttonContainer">
                    <Button target="_blank" href={`http://${this.props.nodeConfig.ip}:${(80 + camera.cameraNumber)}/`} variant="contained">View Camera Webpage</Button>
                  </div>
                </div>
              </Paper>
            </Grid>
          } ) }
          <Grid item xs={12}>
            <Button onClick={this.props.handleClose} sx={ {border: "1px solid white" } } color="error" variant="contained" target="_blank">Close Location</Button> 
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default VideoGrid;
