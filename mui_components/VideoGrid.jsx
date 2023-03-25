import React from "react";
import "./VideoGrid.sass";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

class VideoGrid extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div style={ {display: this.props.display ? 'block' : 'none'} }>
        <div className="video-grid">
          <Button sx={ {border: "1px solid white" } } color="success" variant="contained" target="_blank" href={`http://${this.props.nodeConfig.ip}:7878/`}>Live Monitoring & Clips</Button> 

          { this.props.nodeConfig.cameras.map( (camera) => {
            return <Button sx={ { marginTop: "10px", align: "left"} } key={camera.cameraNumber} target={`_blank`} 
                           href={`http://${this.props.nodeConfig.ip}:${(80 + camera.cameraNumber)}/`} 
                           variant="contained">{camera.humanReadableName} Webpage</Button>
          } ) }

          <Button onClick={this.props.handleClose} sx={ {border: "1px solid white", marginTop: "10px" } } color="error" variant="contained" target="_blank">Close Location</Button> 
        </div>
      </div>
    );
  }
}

export default VideoGrid;
