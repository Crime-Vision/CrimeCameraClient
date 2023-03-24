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
      }
    });
  }

  unwireStream(camera) {
    camera.ws.close();
    camera.mse.removeEventListener('sourceopen', camera.sourceOpenCallback, false);
    console.log("Removed the stream callback");
    camera.mse = new MediaSource();
    camera.mseQueue = [];
    camera.mseSourceBuffer = null;
    camera.mseStreamingStarted = false;
    camera.videoSound = false;
  }

  wireUpStream(camera) {
    camera.mse = new MediaSource();
    camera.mseQueue = [];
    camera.mseSourceBuffer = null;
    camera.mseStreamingStarted = false;
    camera.videoSound = false;

    camera.reference.current.src = window.URL.createObjectURL(camera.mse);
    let stream_slug = `${camera.humanReadableName.replaceAll(/\s/g, '-')}`;

    let url = "ws" + '://' + 'demo.crime-vision.com:8083' + '/stream/' + stream_slug + '/channel/' + '0' + '/mse?uuid=' + stream_slug + '&channel=' + "0";
    camera.sourceOpenCallback = function() {
      camera.ws = new WebSocket(url);
      camera.ws.binaryType = "arraybuffer";
      camera.ws.onopen = function(event) {
        console.log('Connect to ws');
      }
      camera.ws.onmessage = function(event) {
        let data = new Uint8Array(event.data);
        if (data[0] == 9) {
          let decoded_arr = data.slice(1);
          let mimeCodec = null;
          if (window.TextDecoder) {
            mimeCodec = new TextDecoder("utf-8").decode(decoded_arr);
          } else {
            mimeCodec = Utf8ArrayToStr(decoded_arr);
          }
          if(mimeCodec.indexOf(',')>0){
            videoSound=true;
          }
          camera.mseSourceBuffer = camera.mse.addSourceBuffer('video/mp4; codecs="' + mimeCodec + '"');
          camera.mseSourceBuffer.mode = "segments"
          camera.mseSourceBuffer.addEventListener("updateend", pushPacket);

        } else {
          readPacket(event.data);
        }
      };
    }

    camera.mse.addEventListener('sourceopen', camera.sourceOpenCallback, false);

		function pushPacket() {
			if (!camera.mseSourceBuffer.updating) {
				if (camera.mseQueue.length > 0) {
					let packet = camera.mseQueue.shift();
          console.log("Pushing Packet!");
          console.log(camera);
          console.log(camera.mseSourceBuffer);
					camera.mseSourceBuffer.appendBuffer(packet);
				} else {
					camera.mseStreamingStarted = false;
				}
			}
			if (camera.reference.current.buffered.length > 0) {
				if (typeof document.hidden !== "undefined" && document.hidden && !videoSound) {
					//no sound, browser paused video without sound in background
					camera.reference.current.currentTime = camera.reference.current.buffered.end((camera.reference.current.buffered.length - 1)) - 0.5;
				}
			}
		}

		function readPacket(packet) {
			if (!camera.mseStreamingStarted) {
				camera.mseSourceBuffer.appendBuffer(packet);
				camera.mseStreamingStarted = true;
				return;
			}
			camera.mseQueue.push(packet);
			if (!camera.mseSourceBuffer.updating) {
				pushPacket();
			}
		}

    camera.reference.current.addEventListener('loadeddata', () => {
      camera.reference.current.play();
    });
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
        this.unwireStream(camera);
      });
    }
  }

  render() {
    return (
      <div style={ {display: this.props.display ? 'block' : 'none'} }>
      <div className="video-grid">
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
          </Grid>
        </Grid>

      </div>
      <div className="videoGridCloseButton" >
        <Button onClick={this.props.handleClose} sx={ {border: "1px solid white" } } color="error" variant="contained" target="_blank">Close Location</Button> 
      </div>
      </div>
    );
  }
}

export default VideoGrid;
