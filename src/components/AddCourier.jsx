/* global google */
import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import TimeInput from "material-ui-time-picker";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";


export default class AddCourier extends Component {
  constructor(props) {
    super(props);

    this.state = {
      courierOptions: {
        source: "",
        destination: "",
        deliveryDate: ""
      },
      directionsRenderer : null
    };
    this.handleSource = this.handleSource.bind(this);
    this.handleDestination = this.handleDestination.bind(this);
    this.onChangeTime = this.onChangeDeliveryDate.bind(this);
    this.handleFormValues = this.handleFormValues.bind(this);
    
  }

  componentDidMount() {
    
  }

  setDirectionText(){
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
  }

  handletravelmode(e) {
    e.persist();
    this.setState(prevState => ({
      courierOptions: {
        ...prevState.courierOptions,
        travelmode: e.target.value
      }
    }));
  }

  handleFormValues() {
   
    
  }
  render() {
    return (
      <div className="addCourier">
        <Form>
          <Form.Group>
            <Form.Label>Travelling from</Form.Label>
            <GooglePlacesAutocomplete
              placeholder="Source"
              inputClassName="form-control"
              onSelect={this.handleSource}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Travelling to</Form.Label>
            <GooglePlacesAutocomplete
              placeholder="Destination"
              inputClassName="form-control"
              onSelect={this.handleDestination}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Should be delivered on</Form.Label>
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
          Let's go
        </Button>
        <div id="directionsText"></div>
      </div>
    );
  }
}
