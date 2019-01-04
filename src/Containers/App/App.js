import React, { Component } from 'react';
import NavBar from '../../Components/NavBar/NavBar';
import Homepage from '../Homepage/Homepage';
import Application from '../Application/Application';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className={`App ${'notSignedIn'}`}>
        <NavBar />
          <Homepage />
      </div>
    );
  }
}

export default App;
