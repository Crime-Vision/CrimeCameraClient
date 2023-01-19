import React from "react";
import "./Navigation.sass";
import logo from "./crime-vision-logo-small.png";

class Navigation extends React.Component {
  render() {
    return (
      <div className="navigation">
        <img
          className="rtcc-logo-transparent-image-1-1-1"
          src={logo}
        />
        <div className="real-time-crime-tracker worksans-bold-white-20px">Crime-Vision Analyst</div>
      </div>
    );
  }
}

export default Navigation;
