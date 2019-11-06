import React, { Component } from 'react';
import './App.css';
import Inventory from '../Inventory/Inventory.js';
import { connect } from 'react-redux';

class App extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'FETCH_INVENTORY'
    })
  }

  render() {
    return (
      <div className="App">
        <h1>Hello World!</h1>
        <Inventory />
      </div>
    )
  }
}

export default connect()(App);