import React, { Component } from 'react';
import { connect } from 'react-redux';
import OrderLines from './OrderLines.js';

class Orders extends Component {

    //gets all orders and accompanying line items on mount
    componentDidMount() {
        this.props.dispatch({
            type: 'FETCH_ORDERS'
        });
    };

    newOrder = () => {
        this.props.history.push('/cart');
    };

    render() {

        //maps over all orders and renders using the OrderLines component
        const renderOrders = this.props.orders.map((order) => {
            return (<OrderLines key={order.order_id} order={order} />)
        });

        return (
            <section>
                <h2>Orders</h2>
                <hr />
                <button onClick={this.newOrder}>Place New Order</button>
                <hr />
                {renderOrders}
            </section>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        orders: store.orderReducer
    };
};

export default connect(mapStateToProps)(Orders);
