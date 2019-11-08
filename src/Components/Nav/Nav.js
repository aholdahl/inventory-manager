import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Nav extends Component {
    render() {
        return (
            <header>
                <h1>Inventory Manager</h1>
                <nav>
                    <NavLink to="/bins" title="Click to view Bins" activeClassName="currentPage">Bins</NavLink>
                    <NavLink to="/products" title="Click to view Products" activeClassName="currentPage">Products</NavLink>
                    <NavLink to="/inventory" title="Click to view Inventory" activeClassName="currentPage">Inventory</NavLink>
                    <NavLink to="/orders" title="Click to view Orders" activeClassName="currentPage">Orders</NavLink>
                    <NavLink to="/cart" title="Click to view New Order Form" activeClassName="currentPage">New Order</NavLink>
                </nav>
            </header>
        )
    }
}

export default Nav;