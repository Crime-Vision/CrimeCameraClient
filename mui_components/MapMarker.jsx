import React from 'react';
import PropTypes from 'prop-types';
import "./MapMarker.sass";

import VideoGrid from "./VideoGrid";
import Grid from '@mui/material/Grid';

class MapMarker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      display: false
    }
  }

  static defaultProps = {
    config: {} 
  }

  handleClick = () =>  {
    this.setState( prevState => ({ display: !prevState.display }) )
  }

  handleClose = () =>  {
    this.setState( prevState => ({ display: false }) )
  }

  render() {
    return (
      <div>
        <div onClick={this.handleClick} data-name={this.props.cameraConfig.name} className={'mapMarker ' + 'green'}></div>
        
        <VideoGrid handleClose={this.handleClose} display={this.state.display} nodeConfig={this.props.cameraConfig} /> 
      </div>
    );
  }
}


export default MapMarker;
