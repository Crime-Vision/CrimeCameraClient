import React from "react";
import GoogleMapReact from "google-map-react";
import "./Map.sass";

import Marker from "../Marker/"

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
          <a target="_blank" href={`http://${process.env.RTSPTOWEB_HOST_AND_PORT || 'localhost:8083'}/pages/multiview/full?controls`}>[Click Here for Multiview]</a>
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
