import React, { Component } from 'react';
import './App.css';
import Bins from '../Bins/Bins.js';
import Inventory from '../Inventory/Inventory.js';
import OrderForm from '../Orders/OrderForm.js';
import Orders from '../Orders/Orders.js';
import Products from '../Products/Products.js';

import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

class App extends Component {

  render() {
    return (
      <>
        <Router>
          <Nav />
          <main>
            <Switch>
              <Redirect exact from="/" to="/orders" />

              <Route exact path="/bins" component={Bins} />
              <Route exact path="/products" component={Products} />
              <Route exact path="/inventory" component={Inventory} />
              <Route exact path="/cart" component={OrderForm} />
              <Route exact path="/orders" component={Orders} />

              {/* If none of the other routes matched, we will show a 404. */}
              <Route render={() => <h2>404: Page not found</h2>} />
            </Switch>
          </main>
          <Footer />
        </Router>
      </>
    )
  }
}

export default App;