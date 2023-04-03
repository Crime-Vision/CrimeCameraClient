import React from "react";
import "./BroadcastWindow.sass";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { ReactAudioRecorder } from '@sarafhbk/react-audio-recorder'
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

class BroadcastWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
      connected: false
    }

    this.websocket = null;
  }

  openWebsocketConnectionToHardware() {
    this.websocket = new WebSocket(`ws://${this.props.nodeConfig.ip}:8888`); 

    var component = this;

    this.websocket.onopen = function() {
      component.setState({connected: true});
    };

  }

  closeWebsocketConnectionToHardware() {
    this.websocket.close();
    this.websocket = null;
    this.setState({connected: true});
  }

  closeDialog() {
    this.setState({dialogOpen: false});
    this.closeWebsocketConnectionToHardware();
  }

  openDialog() {
    this.setState({dialogOpen: true});
    this.openWebsocketConnectionToHardware();
  }

  render() {
    return(
      <div>
        <Button onClick={() => { this.openDialog() } } sx={ {border: "1px solid white", marginTop: "10px" } } color="warning" variant="contained" target="_blank">
          Deterrent Controls
        </Button> 
        <Dialog fullWidth  onClose={() => {this.closeDialog()}} open={this.state.dialogOpen}>
          <DialogTitle style={ { textAlign: "center" } }>
            Deterrent & Hardware Control for { `${this.props.nodeConfig.hostName}` }
          </DialogTitle>
          <Paper style={ { padding: "10px"} }>
            <hr />
            <h2>Connected: {`${this.state.connected}`}</h2>
          </Paper>
        </Dialog>  
      </div>
    );    
  }

}

export default BroadcastWindow;










/*
          <ReactAudioRecorder
            render={({
              timer,
              stopRecording,
              startRecording,
              resumeRecording,
              pauseRecording,
              audioResult,
              status,
              errorMessage
            }) => (
              <div>
                <audio controls src={audioResult} />
                <p>
                  Status : <b>{status}</b>
                </p>
                <p>
                  Error Message : <b>{errorMessage}</b>
                </p>
                <div>
                  <p>{new Date(timer * 1000).toISOString().substr(11, 8)}</p>
                  <div>
                    <button onClick={startRecording}>Start</button>
                    <button onClick={stopRecording}>Stop</button>
                    <button onClick={pauseRecording}>Pause</button>
                    <button onClick={resumeRecording}>Resume</button>
                  </div>
                </div>
              </div>
            )}
          />
*/
