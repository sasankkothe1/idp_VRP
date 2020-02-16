import React, { Component } from 'react';

import {Navbar, Button, Form} from 'react-bootstrap';
import { Link } from 'react-router-dom';


export default class Nav extends Component {
    constructor(props) {
        super(props);
    }


    render () {
        return (

            <Navbar className="NavBarMainHeader nav" bg="light" expand="lg">
               <Link to="/"> <Navbar.Brand className="NavBrandClass" href={"#home"}>
                    <div className={"header-brand"}>
                        <div className={"main-brand"}>VRP tool</div>
                        <div className={"brand-caption"}>Powered by Logistics and supply Chai Management</div>
                    </div>
                </Navbar.Brand>
                </Link>
                <Form inline>
                <Navbar.Collapse className="justify-content-end">
                  <Link to="/addCourier"> <Button variant="light"> New Courier </Button></Link>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                <Link to="/addMiniDepot">  <Button variant="light"> New Mini Depot </Button> </Link>
                </Navbar.Collapse>
                </Form>
            </Navbar>
        )
    }

}