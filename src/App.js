import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Nav from './components/Nav'
import Main from './components/Main'
import './components/Nav.css'
import './components/Main.css'
import './components/MapView.css'
import './components/MapForm.css'

function App() {
  return (
    <Router>
          <Nav/>
          <Main/>
      </Router>

  );
}

export default App;
