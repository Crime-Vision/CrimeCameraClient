import React from "react";
import GoogleMapReact from "google-map-react";
import "./Map.sass";

class Map extends React.Component {
	static defaultProps = {
    center: {
      lat: 31.1435,
      lng: -93.261
    },
    zoom: 12,
    nodes: {}
  };
	
  render() {
    return (
      <div className="map">
        <div className="multiview">
          <img className="logo" src="https://uploads-ssl.webflow.com/63792297b322091a012c3076/6386d30eb2ea18e282c92389_CrimeVision_Logo_V1.21_1920x1080-p-1600.png" />

          <a target="_blank" href={`http://${process.env.RTSPTOWEB_HOST_AND_PORT || 'localhost:8083'}/pages/multiview/full?controls`}>[Click Here for Video Wall]</a>
        </div>

				<GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAxgBe1BLPLfPIPwK0ucb6-SeqkZdckChI' }}
          defaultCenter={this.props.center} defaultZoom={this.props.zoom}>	

          { Object.keys(this.props.nodes).map( (name) => {
            var lat = this.props.nodes[name].config.locationLat;
            var lon = this.props.nodes[name].config.locationLong;

            return <Marker key={name} 
                      color="green" lat={lat} lng={lon} cameraName={name} 
                      onClick={ this.props.handleClick } />
          }) }

				</GoogleMapReact>

			</div>
    );
  }
}

export default Map;
