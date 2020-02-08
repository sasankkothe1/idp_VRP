import React, { Component } from "react";
import MapConfig from '../mapconfig'
import GoogleMapReact from "google-map-react";

export default class MapView extends Component {

  constructor(props) {
      super(props);

    this.state = {
      center: {},
      zoom: 7,
      initialCenter: {
        lat: 59.95,
        lng: 30.33
      }
    };
  }
  render() {
    return (
      <>
        <div className="mapView">
        <GoogleMapReact
                       
                        bootstrapURLKeys={{key: MapConfig.GOOGLE_MAPS_API_KEY}}
                        zoom={this.state.zoom}
                        center={this.state.initialCenter}
                        >
                       
                    </GoogleMapReact>


        </div>
      </>
    );
  }
}
