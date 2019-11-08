import React, { Component } from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';

class Orders extends Component {

    //When Delete Order button is clicked, confirmation dialog will appear
    //Upon confirmation, order id is sent to orderSaga to delete in the database
    deleteOrder = () => {
        Swal.fire({
            title: 'Please confirm',
            text: 'Are you sure you want to delete this order?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Delete'
        }).then((result) => {
            if (result.value) {
                this.props.dispatch({
                    type: 'DELETE_ORDER',
                    payload: { orderId: this.props.order.order_id }
                });
            };
        });
    };

    //When Delete Item button is clicked, confirmation dialog will appear
    //Upon confirmation, order line id is sent to orderSaga to delete in the database
    deleteOrderItem = (id) => {
        if (this.props.order.order_lines.length > 1) {
            Swal.fire({
                title: 'Please confirm',
                text: 'Are you sure you want to delete this order item?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Delete'
            }).then((result) => {
                if (result.value) {
                    this.props.dispatch({
                        type: 'DELETE_ORDER_LINE',
                        payload: { orderLineId: id }
                    });
                };
            });
        } else {
            this.deleteOrder();
        };
    };

    render() {

        //maps over order line item and renders as table row
        const renderOrderLines = this.props.order.order_lines.map((item) => {
            return (
                <tr key={item.order_line_id}>
                    <td>{item.product_description}</td>
                    <td>{item.sku}</td>
                    <td>{item.quantity}</td>
                    {/* <td><button>Edit Order Item</button></td> */}
                    <td><button title="Click to delete this Product from the Order" onClick={(event) => { this.deleteOrderItem(item.order_line_id) }}>Delete Order Item</button></td>
                </tr>
            )
        });

        return (
            <section>
                <h3>Order #: {this.props.order.order_number}</h3>
                <p>Date: {(new Date(this.props.order.date_ordered)).toDateString()}</p>
                <p>{this.props.order.customer_name}</p>
                <p>{this.props.order.customer_address}</p>
                <table>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>SKU</th>
                            <th>Quantity</th>
                            {/* <th>Edit</th> */}
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderOrderLines}
                    </tbody>
                </table>
                <button title="Click to delete this Order" onClick={this.deleteOrder}>Delete Order</button>
            </section>
        )
    }
}

export default connect()(Orders);