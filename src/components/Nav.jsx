import React, { Component } from 'react';

import {Navbar, Button} from 'react-bootstrap';
import { Redirect } from 'react-router';


export default class Nav extends Component {

    render () {
        return (

            <Navbar className="NavBarMainHeader nav" bg="light" expand="lg">
                <Navbar.Brand className="NavBrandClass" href={"#home"}>
                    <div className={"header-brand"}>
                        <div className={"main-brand"}>VRP tool</div>
                        <div className={"brand-caption"}>Powered by Logistics and supply Chai Management</div>
                    </div>
                </Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    <Button variant="primary"> Admin </Button>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
