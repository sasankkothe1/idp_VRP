/* global google */
import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import TimeInput from "material-ui-time-picker";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import AddCourierAction from "./actions/addCourier.action";
import Geocode from "react-geocode";
import MapConfig from "../mapconfig";

Geocode.setApiKey(MapConfig.GOOGLE_MAPS_API_KEY);
Geocode.setLanguage("en");

export default class AddCourier extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date : new Date(),
      courierOptions: {
        name :"",
        source: "",
        destination: "",
        deliveryDate: ""
      },

    };
    this.handleName = this.handleName.bind(this);
    this.handleSource = this.handleSource.bind(this);
    this.handleDestination = this.handleDestination.bind(this);
    this.onChangeDeliveryDate = this.onChangeDeliveryDate.bind(this);
    this.handleFormValues = this.handleFormValues.bind(this);
    this.onChangeDeliveryDates = this.onChangeDeliveryDates.bind(this);
    
  }

  componentDidMount() {
    
  }

  setDirectionText(){
  }

  onChangeDeliveryDates(date) {
    console.log("hi")
    console.log(date)
  }

  handleName(e) {
      let name = e.target.value
      this.setState(prevState => ({
          courierOptions : {
              ...prevState.courierOptions,
              name: name
          }
      }))
  }

  handleSource(e) {
    this.setState(prevState => ({
      courierOptions: {
        ...prevState.courierOptions,
        source: e.description
      }
    }));
  }

  handleDestination(e) {
    this.setState(prevState => ({
      courierOptions: {
        ...prevState.courierOptions,
        destination: e.description
      }
    }));
  }

  onChangeDeliveryDate(e) {
    this.setState(prevState => ({
      courierOptions: {
        ...prevState.courierOptions,
        deliveryDate: e
      }
    }));

    console.log(this.state.courierOptions.deliveryDate)
  }


  async handleFormValues() {
      let courier_source_location = this.state.courierOptions.source;
      let courier_destination_location = this.state.courierOptions.destination;
      let results_source = await Geocode.fromAddress(courier_source_location).then(response => {
        return response;
      })
      let results_destination = await Geocode.fromAddress(courier_destination_location).then(response => {
        return response;
      })

      let courier_source_lat = results_source.results[0].geometry.location.lat;
      let courier_source_lng = results_source.results[0].geometry.location.lng;

      let courier_destination_lat = results_destination.results[0].geometry.location.lat;
      let courier_destination_lng = results_destination.results[0].geometry.location.lng;

      let finalCourierOption = null;
      finalCourierOption = {
        _id : this.state.courierOptions.name,
        source : {
          lat : courier_source_lat,
          lng : courier_source_lng
        },
        destination : {
          lat : courier_destination_lat,
          lng : courier_destination_lng
        },
        deliveryDate : ""+this.state.courierOptions.deliveryDate
      }

      AddCourierAction.addCourier(finalCourierOption);
  }
  render() {
    return (
      <div className="addCourier">
        <Form>
        <Form.Group>
            <Form.Label>Courier Name </Form.Label>
            <Form.Control type="text"
                placeholder="Courier Name"
                onChange={this.handleName}></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Source </Form.Label>
            <GooglePlacesAutocomplete
              placeholder="Source"
              inputClassName="form-control"
              onSelect={this.handleSource}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Destination</Form.Label>
            <GooglePlacesAutocomplete
              placeholder="Destination"
              inputClassName="form-control"
              onSelect={this.handleDestination}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Should be delivered before</Form.Label>
            {/* <Form.Control type="text" placeholder="Select the time" /> */}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <TimeInput mode="24h" onChange={this.onChangeDeliveryDate} />
          </Form.Group>
        </Form>
        <Button
          variant="primary"
          type="submit"
          onClick={this.handleFormValues}
        >
          Generate Courier
        </Button>
        </div>
    );
  }
}
