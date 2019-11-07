import React, { Component } from 'react';
import { connect } from 'react-redux';
import OrderLines from './OrderLines.js';

class Orders extends Component {
    componentDidMount() {
        this.props.dispatch({
            type: 'FETCH_ORDERS'
        })
    }

    render() {
        return (
            <section>
                <h2>Orders</h2>
                <h3>Place Order</h3>
                
                <h3>Current Orders</h3>
                <OrderLines/>
            </section>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        store
    };
};

export default connect(mapStateToProps)(Orders);