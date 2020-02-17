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
    
  }

  componentDidMount() {
    
  }

  setDirectionText(){
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
  }


  handleFormValues() {
      console.log(this.state.courierOptions)
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
