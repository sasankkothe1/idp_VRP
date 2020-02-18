/* global google */
import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import AddMinidepotAction from "./actions/addMiniDepot.action"
import Geocode from "react-geocode";
import MapConfig from "../mapconfig";

Geocode.setApiKey(MapConfig.GOOGLE_MAPS_API_KEY);
Geocode.setLanguage("en");

export default class AddMiniDepot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      miniDepotOptions: {
        name: "",
        location: "",
        mini_depot_lat : "",
        mini_depot_lng : ""
      },
      directionsRenderer: null
    };
    this.handleName = this.handleName.bind(this);
    this.handleLocation = this.handleLocation.bind(this);
    this.handleFormValues = this.handleFormValues.bind(this);
  }

  componentDidMount() {}

  setDirectionText() {}

  handleName(e) {
    e.persist();
    e.preventDefault();
    let name = e.target.value;
    this.setState(prevState => ({
      miniDepotOptions: {
        ...prevState.miniDepotOptions,
        name: name
      }
    }));
  }

  handleLocation(e) {
    this.setState(prevState => ({
      miniDepotOptions: {
        ...prevState.miniDepotOptions,
        location: e.description
      }
    }));
  }

  async handleFormValues() {
    let minidepotLocation = this.state.miniDepotOptions.location;
    let finalMiniDepotOptions = null;
    let results = await Geocode.fromAddress(minidepotLocation).then(response => {
      return response;
    })
    let mini_depot_lat = results.results[0].geometry.location.lat;
    let mini_depot_lng = results.results[0].geometry.location.lng;;
       finalMiniDepotOptions = {
        _id: this.state.miniDepotOptions.name,
        type: "Feature",
        properties: {},
        geometry: {
          type: "Point",
          coordinates: [mini_depot_lng, mini_depot_lat]
        }
      };
      AddMinidepotAction.addMiniDepot(finalMiniDepotOptions)
  }


  render() {
    return (
      <div className="addMiniDepot">
        <Form>
          <Form.Group>
            <Form.Label>Mini depot name </Form.Label>
            <Form.Control
              type="text"
              placeholder="Mini Depot Name"
              onChange={this.handleName}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Location of the Mini Depot </Form.Label>
            <GooglePlacesAutocomplete
              placeholder="Mini Depot Location"
              inputClassName="form-control"
              onSelect={this.handleLocation}
            />
          </Form.Group>
        </Form>
        <Button variant="primary" type="submit" onClick={this.handleFormValues}>
          Add new Mini Depot
        </Button>
      </div>
    );
  }
}
