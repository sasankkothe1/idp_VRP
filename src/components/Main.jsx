import React, { Component } from 'react';
import MapView from './MapView'
import MapForm from './MapForm'

export default class Main extends Component {
    render () {
        return (
            <div className="main">
                <MapView/>
                <MapForm/>
            </div>
        )
    }
}
