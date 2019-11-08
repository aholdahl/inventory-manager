import React, { Component } from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import ProductMenu from '../Products/ProductMenu.js';

class OrderForm extends Component {
    state = {
        customerName: '',
        customerAddress: '',
        orderNumber: '',
        dateOrdered: '',
        selectedProduct: 0,
        quantity: 0,
        orderLines: []
    }

    //In Edit mode, captures any changes to the input values and stores in local state
    handleOrderChange = (event, property) => {
        this.setState({
            ...this.state,
            [property]: event.target.value
        })
    }

    //When the Set Date to Now button is clicked, inserts today's date into the order form
    setDate = () => {
        this.setState({
            ...this.state,
            dateOrdered: new Date().toDateString()
        })
    }

    //When Add Order Item button is clicked, new product and quantity are stored in orderLines array within local state
    //This function is purposefully not equipped with confirmation dialog, since it is storing in local state only
    addOrderItem = () => {
        if (this.state.selectedProduct && this.state.quantity) {
            this.setState({
                ...this.state,
                orderLines: [...this.state.orderLines,
                {
                    product_id: Number(this.state.selectedProduct),
                    quantity: Number(this.state.quantity)
                }]
            })
        } else {
            Swal.fire('Please select a product and enter a quantity.')
        }
    }

    // editCartItem = (i)=>{
    //     console.log('In EditCartItem', i)
    // }

    //When Delete Order Item button is clicked, product and quantity are removed from orderLines array within local state
    deleteCartItem = (item) => {
        Swal.fire({
            title: 'Please confirm',
            text: 'Are you sure you want to delete this item from the cart?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Delete'
        }).then((result) => {
            if (result.value) {
                this.setState({
                    orderLines: this.state.orderLines.filter(line => line !== item)
                });
            }
        })
    }

    //When Submit Order button is clicked, local state is checked for required fields
    submitOrder = () => {
        if (this.state.orderLines.length > 0 && this.state.customerName && this.state.customerAddress && this.state.dateOrdered && this.state.orderNumber) {
            Swal.fire({
                title: 'Please confirm',
                text: 'Are you sure you want to submit this order?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Save Changes'
            }).then((result) => {
                if (result.value) {
                    this.props.dispatch({
                        type: 'SUBMIT_ORDER',
                        payload: { ...this.state }
                    })
                }
                this.cancelOrder();
            })
        } else {
            Swal.fire('Please finish entering order details before submitting.')
        }
    }

    //When Cancel Order is clicked, local state is reset to original state.
    cancelOrder = () => {
        this.setState({
            ...this.state,
            customerName: '',
            customerAddress: '',
            orderNumber: '',
            dateOrdered: '',
            selectedProduct: 0,
            quantity: 0,
            orderLines: []
        })
    }

    render() {

        //maps over items in cart, compares to productReducer to get the details, and renders as table row
        const renderCart = this.state.orderLines.map((item, i) => {
            let productInfo = this.props.products.filter((product) => { return (item.product_id === product.product_id) })
            return (<tr key={i}>
                <td>{productInfo[0].product_description}</td>
                <td>{productInfo[0].sku}</td>
                <td>{item.quantity}</td>
                {/* <td><button onClick={()=>{this.editCartItem(item)}}>Edit</button></td> */}
                <td><button onClick={() => { this.deleteCartItem(item) }}>Delete</button></td>
            </tr>)
        })

        return (
            <section>
                <h2>Order Form</h2>
                <hr />

                <h3>Add To Cart</h3>
                <ProductMenu selectedProduct={this.state.selecteProduct} handleChange={this.handleOrderChange} />
                <input placeholder="Quantity" value={this.state.quantity > 0 ? this.state.quantity : ''} onChange={(event) => { this.handleOrderChange(event, 'quantity') }} />
                <button onClick={this.addOrderItem}>Add To Cart</button>

                <h3>Cart</h3>
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
                        {renderCart}
                    </tbody>
                </table>

                <h3>Customer Info</h3>
                <input placeholder="Name" value={this.state.customerName} onChange={(event) => { this.handleOrderChange(event, 'customerName') }} />
                <input placeholder="Address" value={this.state.customerAddress} onChange={(event) => { this.handleOrderChange(event, 'customerAddress') }} />
                <input placeholder="Order Number" value={this.state.orderNumber} onChange={(event) => { this.handleOrderChange(event, 'orderNumber') }} />
                <input placeholder="Order Date" value={this.state.dateOrdered} onChange={(event) => { this.handleOrderChange(event, 'dateOrdered') }} />
                <button onClick={this.setDate}>Set Date to Now</button>
                <br/>
                <button onClick={this.submitOrder}>Submit Order</button>
                <button onClick={this.cancelOrder}>Cancel Order</button>
            </section>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        products: store.productReducer,
        orders: store.orderReducer
    };
};

export default connect(mapStateToProps)(OrderForm);