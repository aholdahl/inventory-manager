import React, { Component } from 'react';
import './App.css';
import Bins from '../Bins/Bins.js';
import Inventory from '../Inventory/Inventory.js';
import OrderLines from '../OrderLines/OrderLines.js';
import Orders from '../Orders/Orders.js';
import Products from '../Products/Products.js';

class App extends Component {

  render() {
    return (
      <div className="App">
        <h1>Inventory Manager</h1>
        <Bins />
        <Products />
        <Inventory />
        <OrderLines />
        <Orders />
      </div>
    )
  }
}

export default App;