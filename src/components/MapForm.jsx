import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import TimePicker from 'react-time-picker';

export default class MapForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            
        }

    }

    componentDidMount(){
        let hours = new Date().getHours();
        let min = new Date().getMinutes();
        let secs = new Date().getSeconds();
        let currentTime  = hours + ":" + min + ":" + secs;
        this.setState({
            time : currentTime
        })
    }
  render() {
    return (
      <div className="mapForm">
        <Form>
          <Form.Group>
            <Form.Label>Travelling from</Form.Label>
            <Form.Control type="text" placeholder="Source" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Travelling to</Form.Label>
            <Form.Control type="text" placeholder="Destination" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Free Until</Form.Label>
            {/* <Form.Control type="text" placeholder="Select the time" /> */}
            <TimePicker
                value = {this.state.time}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>How are you travelling</Form.Label>
            <Form.Control as="select">
              <option>Walking</option>
              <option>Bicycling</option>
              <option>Transit</option>
              <option>Driving</option>
            </Form.Control>
          </Form.Group>
        </Form>
        <Button block variant="primary" type="submit">
          Let's go
        </Button>
      </div>
    );
  }
}
