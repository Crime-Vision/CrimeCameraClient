import React from "react";
import AddRemoveSimple from "../AddRemoveSimple";
import "./OnlineYesAddCamerasNo.sass";

class OnlineYesAddCamerasNo extends React.Component {
  componentDidMount() {
    console.log(this.props.name);

    if(typeof(this.props.cameras) !== 'undefined') {
      this.props.cameras.forEach(camera => {
        this.props.wireUpStream(camera);
      });
    }
  }

  render() {
    var content = null

    if( typeof(this.props.cameras) !== 'undefined' ) {

      content = this.props.cameras.map( camera => {
        if( typeof(camera) !== 'underfined' ) {
          return <video style={ {width: "200px", height: "150px", margin: "10px"} } ref={camera.reference} key={camera.cameraNumber} controls autoPlay />
        } else {
          return ""
        }
      });

    } 

    return (
      <div>
        <div> <a target="_blank" href={`http://${this.props.nodeIPAddress}:7878/`}> Download Footage </a> </div>
        <div> {content} </div>
      </div>
    );
  }
}

export default OnlineYesAddCamerasNo;
