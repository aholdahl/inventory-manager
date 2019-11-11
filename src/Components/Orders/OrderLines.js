import React, { Component } from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';

class Orders extends Component {
    state = {
        orderNumber: '',
        dateOrdered: '',
        customerName: '',
        customerAddress: '',
        editMode: false
    }

    //When Edit button is clicked, stores order prop in local state and renders as inputs.
    //When Save button is clicked, renders as text
    toggleEditMode = () => {
        this.setState({
            ...this.state,
            orderNumber: this.props.order.order_number,
            dateOrdered: this.props.order.date_ordered,
            customerName: this.props.order.customer_name,
            customerAddress: this.props.order.customer_address,
            editMode: !this.state.editMode
        });
    };

    //In Edit mode, captures any changes to the input values and stores in local state
    handleOrderChange = (event, property) => {
        this.setState({
            ...this.state,
            [property]: event.target.value
        });
    };

    //When Save button is clicked, local state is checked for required fields
    //If all required fields are valid, confirmation dialog will appear
    //Upon confirmation, local state is sent to orderSaga to update the database
    //State returns to editMode: false
    saveOrderChanges = ()=>{
        if (this.state.orderNumber && this.state.dateOrdered && this.state.customerName && this.state.customerAddress) {
            Swal.fire({
                title: 'Please confirm',
                text: 'Are you sure you want to update this order?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Save Changes'
            }).then((result) => {
                if (result.value) {
                    this.props.dispatch({
                        type: 'UPDATE_ORDER',
                        payload: {
                            ...this.state,
                            orderId: this.props.order.order_id
                        }
                    })
                    this.toggleEditMode();
                };
            });
        } else {
            Swal.fire('Please complete all required fields.')
        };
    }

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
                { this.state.editMode ?
                <>
                    <input required={true} title="Order Number is required" placeholder="*Order Number" value={this.state.orderNumber} onChange={(event)=>{this.handleOrderChange(event, 'orderNumber')}}/>
                    <input required={true} title="Order Date is required" placeholder="*Order Date" value={this.state.dateOrdered} onChange={(event) => { this.handleOrderChange(event, 'dateOrdered') }}/>
                    <input required={true} title="Full name is required" placeholder="*Full Name" value={this.state.customerName} onChange={(event) => { this.handleOrderChange(event, 'customerName') }}/>
                    <input required={true} title="Full address is required" placeholder="*Full Address" value={this.state.customerAddress} onChange={(event) => { this.handleOrderChange(event, 'customerAddress') }}/>
                    <button title="Click to save changes to this Order"onClick={this.saveOrderChanges}>Save Changes</button>
                    <button title="Click to cancel changes to this Order" onClick={this.toggleEditMode}>Cancel</button>
                </>
                :
                <>
                    <h3>Order #: {this.props.order.order_number}</h3>
                    <p>Date: {(new Date(this.props.order.date_ordered)).toDateString()}</p>
                    <p>{this.props.order.customer_name}</p>
                    <p>{this.props.order.customer_address}</p>
                    <button title="Click to edit this Order" onClick={this.toggleEditMode}>Edit Order</button>
                    <button title="Click to delete this Order" onClick={this.deleteOrder}>Delete Order</button>
                </>
                }
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
            </section>
        )
    }
}

export default connect()(Orders);