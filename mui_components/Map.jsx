import React from "react";
import GoogleMapReact from "google-map-react";
import "./Map.sass";
import MapMarker from "./MapMarker";
import VideoGrid from "./VideoGrid";
import Grid from '@mui/material/Grid';

class Map extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      nodes: {},
      streamingNodes: {}
    }

    this.refreshRecentlyCheckedIn()
  }

  static defaultProps = {
    nodes: {}
  }

  onChange = (e) => {
  }

  refreshRecentlyCheckedIn() {
    var nodeHash = {}

    fetch(`http://${process.env.API_HOST_AND_PORT || 'localhost:3000'}/api/nodes/recentlyCheckedIn`)
      .then((response) => response.json())
      .then( (json) => {
        json.forEach(node => {
          nodeHash[node.name] = node;

          node.config.cameras.forEach(camera => {
            var streamName = camera.humanReadableName;
            var streamID = streamName.replaceAll(/\s/g, "-");

            var requestBody = {
              "uuid": streamID,
              "name": streamName,
                "channels": {
                  "0": {
                    "url": `${camera.rtspURL}`,
                    "on_demand": true,
                    "debug": false,
                  }
                }
            };

            var requestOptions = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(requestBody)
            };

            fetch(`http://${process.env.RTSPTOWEB_HOST_AND_PORT || 'localhost:8083'}/stream/${streamID}/add`, requestOptions);
          });
        });

        this.setState({
          nodes: nodeHash
        });
      });
  }


	static defaultProps = {
    center: {
      lat: 32.40954184276189,
      lng: -93.69138358567842
    },
    zoom: 12,
    nodes: {}
  };
	
  render() {
    return (
      <div className="map">
        <Grid container sx={{height: '100%'}}>
          <Grid item xs={12}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: 'AIzaSyAxgBe1BLPLfPIPwK0ucb6-SeqkZdckChI' }}
              defaultCenter={this.props.center} defaultZoom={this.props.zoom} onChange={this.onChange}>	

              { Object.keys(this.state.nodes).map( (name) => {

                var config = this.state.nodes[name].config;

                var lat = config.locationLat;
                var lng = config.locationLong;

                if(typeof(lng) !== 'undefined' && typeof(lat) !== 'undefined') {
                  return <MapMarker key={name} lat={lat} lng={lng} cameraConfig={config} />
                }

              }) }

            </GoogleMapReact>
          </Grid>
        </Grid>
			</div>
    );
  }
}

export default Map;
