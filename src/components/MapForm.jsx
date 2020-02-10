/* global google */
import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import TimeInput from "material-ui-time-picker";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import MapStore from "./stores/map.store";
import DirectionTextStore from "./stores/directionText.store";
import ShowRouteAction from "./actions/showRoute.actions"
import directionTextActions from "./actions/directionText.actions";
import "react-google-places-autocomplete/dist/assets/index.css";

export default class MapForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userOptions: {
        source: "",
        destination: "",
        time: "",
        travelmode: "",
      },
      directionsRenderer : null
    };
    this.handleSource = this.handleSource.bind(this);
    this.handleDestination = this.handleDestination.bind(this);
    this.onChangeTime = this.onChangeTime.bind(this);
    this.handletravelmode = this.handletravelmode.bind(this);
    this.handleFormValues = this.handleFormValues.bind(this);
    this.setDirectionText = this.setDirectionText.bind(this);
    
  }

  componentDidMount() {
    DirectionTextStore.addChangeListener("GOT_DIRECTIONS", this.setDirectionText);
  }

  setDirectionText(){
    let directionsRenderer = DirectionTextStore.getDirecitonRenderer();
    this.setState({
      directionsRenderer : directionsRenderer
    })
    directionsRenderer.setPanel(document.getElementById('directionsText'));
  }

  handleSource(e) {
    this.setState(prevState => ({
      userOptions: {
        ...prevState.userOptions,
        source: e.description
      }
    }));
  }

  handleDestination(e) {
    this.setState(prevState => ({
      userOptions: {
        ...prevState.userOptions,
        destination: e.description
      }
    }));
  }

  onChangeTime(e) {
    //let time = e.getHours() + ":" + e.getMinutes() + ":" + e.getSeconds();
    //let time = e.getTime();
    //console.log(time)
    this.setState(prevState => ({
      userOptions: {
        ...prevState.userOptions,
        time: e
      }
    }));
  }

  handletravelmode(e) {
    e.persist();
    this.setState(prevState => ({
      userOptions: {
        ...prevState.userOptions,
        travelmode: e.target.value
      }
    }));
  }

  handleFormValues() {
    //console.log(this.state.userOptions);
    ShowRouteAction.showroute(this.state.userOptions);
  }
  render() {
    return (
      <div className="mapForm">
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
            <Form.Label>Free Until</Form.Label>
            {/* <Form.Control type="text" placeholder="Select the time" /> */}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <TimeInput mode="24h" onChange={this.onChangeTime} />
          </Form.Group>
          <Form.Group>
            <Form.Label>How are you travelling</Form.Label>
            <Form.Control as="select" onChange={this.handletravelmode}>
              <option value="WALKING">Walking</option>
              <option value="BICYCLING">Bicycling</option>
              <option value="TRANSIT">Transit</option>
              <option value="DRIVING">Driving</option>
            </Form.Control>
          </Form.Group>
        </Form>
        <Button
          block
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
