/* global google */
import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";


export default class AddMiniDepot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      miniDepotOptions: {
        name: "",
        location: ""
      },
      directionsRenderer : null
    };
    this.handleName = this.handleName.bind(this);
    this.handleLocation = this.handleLocation.bind(this);
    this.handleFormValues = this.handleFormValues.bind(this);
    
  }

  componentDidMount() {
    
  }

  setDirectionText(){
  }

  handleName(e) {
      e.persist()
      e.preventDefault();
      let name = e.target.value;
      this.setState(
        prevState => ({
            miniDepotOptions: {
                ...prevState.miniDepotOptions,
                name: name
            }
        })
    );
  }

  handleLocation(e) {
    this.setState(prevState => ({
        miniDepotOptions: {
        ...prevState.miniDepotOptions,
        location: e.description
      }
    }));
  }



  handleFormValues() {
      console.log(this.state.miniDepotOptions);
  }
  render() {
    return (
      <div className="addMiniDepot">
        <Form>
        <Form.Group>
            <Form.Label>Mini depot name </Form.Label>
            <Form.Control type="text"
             placeholder="Mini Depot Name"
             onChange={this.handleName}></Form.Control>
            
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
        <Button
          variant="primary"
          type="submit"
          onClick={this.handleFormValues}
        >
          Add new Mini Depot
        </Button>
       </div>
    );
  }
}
