import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Nav extends Component {
    render(){
        return (
            <header>
                <h1>Inventory Manager</h1>
                <nav>
                    <Link to="/bins">Bins</Link>
                    <Link to="/products">Products</Link>
                    <Link to="/inventory">Inventory</Link>
                    <Link to="/orders">Orders</Link>
                    <Link to="/cart">New Order</Link>

                </nav>
            </header>
        )
    }
}

export default Nav;