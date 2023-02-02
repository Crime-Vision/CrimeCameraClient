import React from "react";
import AddRemoveSimple from "../AddRemoveSimple";
import "./OnlineYesAddCamerasNo.sass";

class OnlineYesAddCamerasNo extends React.Component {
  componentDidMount() {
    console.log(this.props.name);

    this.props.wireUpStream(this.props.nodeConfig, 0, this.props.cameraReferenceOne);
    this.props.wireUpStream(this.props.nodeConfig, 1, this.props.cameraReferenceTwo);
    this.props.wireUpStream(this.props.nodeConfig, 2, this.props.cameraReferenceThree);
  }

  render() {
    return (
      <div className="x3-column-box-simple">
        <div className="nvrjs-link-div"><a className="nvrjs-link" href={"http://" + this.props.nodeIPAddress + ":7878"}>Download Footage</a></div>
        <div className="flex-col">
          <div className="x52-common-street opensans-normal-lochmara-10px">{this.props.address}</div>

          <div className="overlap-group1">
              <video ref={this.props.cameraReferenceOne} controls autoPlay />
          </div>

          <div className="x57-camera opensans-bold-white-13px">{this.props.name} | Camera 1</div>
        </div>

        <div className="flex-row">
          <div className="flex-col-1">
            <div className="overlap-group2">
              <video ref={this.props.cameraReferenceTwo} controls autoPlay />
            </div>
            <div className="x57-camera-2 opensans-bold-white-13px">{this.props.name} | Camera 2</div>
          </div>

          <div className="flex-col-2">

            <AddRemoveSimple handleClose={this.props.handleClose} nodeName={this.props.name} />

            <div className="overlap-group3">
              <video ref={this.props.cameraReferenceThree} controls autoPlay />
            </div>

            <div className="x57-camera opensans-bold-white-13px">{this.props.name} | Camera 3</div>

          </div>
        </div>
      </div>
    );
  }
}

export default OnlineYesAddCamerasNo;
