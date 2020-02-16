import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Nav from './components/Nav';
import Main from './components/Main';
import AddCourier from './components/AddCourier';
import AddMiniDepot from './components/AddMiniDepot';
import './components/Nav.css';
import './components/Main.css';
import './components/MapView.css';
import './components/MapForm.css';
import './components/AddCourier.css'

function App() {
  return (
    <Router>
          <Nav/>
          <Route exact path="/" component={Main}></Route>
          <Route exact path="/addCourier" component={AddCourier}></Route>
          <Route exact path="/addMiniDepot" component={AddMiniDepot}></Route>
          
      </Router>

  );
}

export default App;
