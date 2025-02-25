import React from "react";
import "./BroadcastWindow.sass";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { ReactAudioRecorder } from '@sarafhbk/react-audio-recorder'
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

class BroadcastWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
      connected: false,
      tabValue: 0,
      readyToBroadcast: false,
      isBroadcasting: false,
      lightIsFlashing: false
    }

    this.websocket = null;
  }

  startLights() {
    this.websocket.send("light: start"); 
  }

  stopLights() {
    this.websocket.send("light: stop");
  }

  openWebsocketConnectionToHardware() {
    this.websocket = new WebSocket(`ws://${this.props.nodeConfig.ip}:8888`); 

    var component = this;

    this.websocket.onopen = function() {
      component.setState({connected: true});
    };

    this.websocket.onclose = function() {
      component.setState({connected: false, readyToBroadcast: false, isBroadcasting: false});
    }

    this.websocket.onmessage = function(event) {
      console.log("RECEIVED MESSAGE");
      console.log(event);

      if(event.type == "message" && event.data.startsWith("light: ") ) {
        console.log("Received light Status Message:");
        console.log(event.data);

        if(event.data.replace("light: ", "") == "flashing") {
          component.setState({lightIsFlashing: true});
        }

        if(event.data.replace("light: ", "") == "stopped") {
          component.setState({lightIsFlashing: false});
        }
      }

      if(event.type == "message" && event.data.startsWith("broadcast: ") ) {
        console.log("Received Broadcast Status Message:");
        console.log(event.data);

        if(event.data.replace("broadcast: ", "") == "ready") {
          component.setState({readyToBroadcast: true});    
        }

        if(event.data.replace("broadcast: ", "") == "stopped") {
          component.setState({isBroadcasting: false});
        }

        if(event.data.replace("broadcast: ", "") == "started") {
          component.setState({isBroadcasting: true});
        }
      }
    }

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

  handleTabChange(newValue) {
    console.log(newValue);
    this.setState({tabValue: newValue}); 
  }

  handleAudioPlayerChange(event) {
    if(event.target.src != "" && event.target.src != null) {
      this.blobReady(event.target.src);
    }
  }

  toggleBroadcast() {
    if(this.state.isBroadcasting == false) {
      this.websocket.send("broadcast: start");
    } else {
      this.websocket.send("broadcast: stop");
    }
  }

  blobReady(blobURL) {

    fetch(blobURL)
      .then(r => r.blob())
      .then(blob => {
        this.websocket.send(blob);
      });
  }

  render() {
    return(
      <div>
        <Button onClick={() => { this.openDialog() } } sx={ {border: "1px solid white", marginTop: "10px" } } color="warning" variant="contained" target="_blank">
          Deterrent Controls
        </Button> 
        <Dialog fullWidth  onClose={() => {this.closeDialog()}} open={this.state.dialogOpen}>
          <DialogTitle style={ { textAlign: "center" } }>
            Deterrent & Hardware Control for { `${this.props.nodeConfig.hostName}` } <br /> ({`${this.state.connected ? "Connected" : "Disconnected"}`})
          </DialogTitle>
          <Paper style={ { padding: "10px"} }>
            <Tabs value={this.state.tabValue} onChange={ (event, newValue) => { this.handleTabChange(newValue) }}>
              <Tab label="Audio Broadcast" {... {id: 'tab-broadcast', 'aria-controls': 'tabpanel-tab-broadcast'} } />
              <Tab label="Control Lights" {... {id: 'tab-lights', 'aria-controls': 'tabpanel-tab-lights'} } />
            </Tabs>

            <div disabled role="tabpanel" hidden={this.state.tabValue !== 0} id={'tab-panel-0'} aria-labelledby={'tabpanel-tab-broadcast'}>
              { this.state.tabValue === 0 && (
                <Paper style={ { padding: "10px" } }>
                  <h2 style={ { textAlign: "center" } }>Record a Broadcast</h2>
                  <hr />
                  
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
                        <audio onCanPlay={(event) => this.handleAudioPlayerChange(event) }
                          style={ { display: "block", margin: "0 auto", border: "1px solid black", borderRadius: "5px", marginBottom: "10px"} } 
                          controls src={audioResult} />
                        <div>
                          <div style={ { margin: "0 auto", textAlign: "center" } }>
                            <p>{ timer > 0 && "Recording Broadcast: " + new Date(timer * 1000).toISOString().substr(11, 8)}</p>
                            <Button sx={ {border: "1px solid white", marginTop: "10px" } } color="success" variant="contained" onClick={startRecording}>Start Recording</Button>
                            <Button sx={ {border: "1px solid white", marginTop: "10px" } } color="error" variant="contained" onClick={stopRecording}>Stop Recording</Button>
                            { this.state.readyToBroadcast && <Button sx={ {border: "1px solid white", marginTop: "10px" } } color="warning" variant="contained" onClick={() => { this.toggleBroadcast() } }>{this.state.isBroadcasting ? "Stop" : "Start" } Broadcast</Button> } 
                          </div>
                        </div>
                      </div>
                    )}
                  />
                </Paper>
              ) }
            </div>

            <div role="tabpanel" hidden={this.state.tabValue !== 1} id={'tab-panel-1'} aria-labelledby={'tabpanel-tab-lights'}>
              { this.state.tabValue === 1 && (
                <Paper style={ { padding: "20px" } }>
                  <h2 style={ { textAlign: "center" } }>Turn Lights On or Off</h2>
                  <hr />
                  <div style={ { margin: "0 auto", textAlign: "center" } }>
                    <p> { "Status: " + (this.state.lightIsFlashing ? "Flashing" : "Off") } </p>
                    <Button sx={ {border: "1px solid white", marginTop: "10px" } } color="success" variant="contained" onClick={() => { this.startLights() }}>Turn Strobe On</Button>
                    <Button sx={ {border: "1px solid white", marginTop: "10px" } } color="error" variant="contained" onClick={() => { this.stopLights() } }>Turn Strobe Off</Button>
                  </div>
                </Paper>
              ) }
            </div>
            
          </Paper>
        </Dialog>  
      </div>
    );    
  }
}

export default BroadcastWindow;










/*
*/
