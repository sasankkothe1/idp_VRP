/* global google */
import React, { Component } from "react";
import MapConfig from "../mapconfig";
import MapStore from "./stores/map.store";
import GoogleMapReact from "google-map-react";
import directionTextActions from "./actions/directionText.actions";
//import {withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer } from "react-google-maps";

export default class MapView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      center: {},
      zoom: 13,
      initialCenter: {
        lat: 48.134754,
        lng: 11.582
      },
      UserOptions: null,
      directions: null,
      map : null,
      maps : null,
     directionsRenderer : null
    };
    this.showroute = this.showroute.bind(this);
    this.handleApiLoaded = this.handleApiLoaded.bind(this);
    this.map = React.createRef();
  }

  componentDidMount() {
    MapStore.addChangeListener("SHOW_ROUTE", this.showroute);

    this.setState({
      map: null
    })
  }

  handleApiLoaded(map, maps) {

    //console.log("handle api loaded : +++" + map)
    let DirectionsRenderer = new google.maps.DirectionsRenderer({
      map: map
    });

    this.setState({
      map : map,
      maps: maps,
      directionsRenderer : DirectionsRenderer
    });

  }
  showroute() {
    let UserOptions = MapStore.getUserOptions();
    this.setState({
      UserOptions: UserOptions
    });
    let DirectionsService = new google.maps.DirectionsService();
    let DirectionsRenderer = this.state.directionsRenderer;
    DirectionsService.route(
      {
        origin: UserOptions.source,
        destination: UserOptions.destination,
        travelMode: UserOptions.travelmode,
        drivingOptions : {
          departureTime : new Date((UserOptions.time).getTime())
        },
        transitOptions : {
          departureTime : new Date((UserOptions.time).getTime())
        }
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result
          });
          DirectionsRenderer.setDirections(result)
        } else {
          console.log("error  ++++ " + result);
        }
      }
    );

    directionTextActions.setDirectionText(this.state.directionsRenderer);
  }

  render() {
    return (
      <>
        <div className="mapView">
          <GoogleMapReact
            bootstrapURLKeys={{ key: MapConfig.GOOGLE_MAPS_API_KEY }}
            zoom={this.state.zoom}
            center={this.state.initialCenter}
            ref = {this.maps}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => {this.handleApiLoaded(map, maps)}}
          >
          </GoogleMapReact>
        </div>
      </>
    );
  }
}
