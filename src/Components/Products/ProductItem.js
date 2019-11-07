import React, { Component } from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';

class ProductItem extends Component {
    state = {
        sku: '',
        productDescription: '',
        editMode: false
    }

    //When Edit button is clicked, stores product prop in local state and renders as inputs.
    //When Save button is clicked, renders as text
    toggleEditMode = () => {
        this.setState({
            ...this.state,
            sku: this.props.product.sku,
            productDescription: this.props.product.product_description,
            editMode: !this.state.editMode
        })
    }

    //In Edit mode, captures any changes to the input values and stores in local state
    handleProductChange = (event, property) => {
        this.setState({
            ...this.state,
            [property]: event.target.value
        })
    }

    //When Save button is clicked, confirmation dialog will appear
    //Upon confirmation, local state is sent to productSaga to update the database
    //State returns to editMode: false
    saveProductChanges = () => {
        Swal.fire({
            title: 'Please confirm',
            text: 'Are you sure you want to update this product?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Save Changes'
        }).then((result) => {
            if (result.value) {
                this.props.dispatch({
                    type: 'UPDATE_PRODUCT',
                    payload: {
                        ...this.state,
                        productId: this.props.product.product_id
                    }
                })
            }
            this.toggleEditMode()
        })
    }

    //When Delete button is clicked, confirmation dialog will appear
    //Upon confirmation, product id is sent to productSaga to delete in the database
    deleteProduct = () => {
        Swal.fire({
            title: 'Please confirm',
            text: 'Are you sure you want to delete this product?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Delete'
        }).then((result) => {
            if (result.value) {
                this.props.dispatch({
                    type: 'DELETE_PRODUCT',
                    payload: { productId: this.props.product.product_id }
                })
            }
        })
    }

    render() {

        //delete button will only appear if there are 0 in stock and 0 pending orders
        let deleteButton = !this.props.product.inventory_quantity && !this.props.product.order_quantity
            ? <td><button onClick={this.deleteProduct}>Delete Product</button></td>
            : <td></td>

        return (
            <>
                {/* If either quantity is NULL, render 0 */}
                {this.state.editMode
                    ?
                    <tr>
                        <td><input value={this.state.productDescription} onChange={(event) => { this.handleProductChange(event, 'productDescription') }} /></td>
                        <td><input value={this.state.sku} onChange={(event) => { this.handleProductChange(event, 'sku') }} /></td>
                        <td>{this.props.product.inventory_quantity || 0}</td>
                        <td>{this.props.product.order_quantity || 0}</td>
                        <td><button onClick={this.saveProductChanges}>Save</button></td>
                        {deleteButton}
                    </tr>
                    :
                    <tr>
                        <td>{this.props.product.product_description}</td>
                        <td>{this.props.product.sku}</td>
                        <td>{this.props.product.inventory_quantity || 0}</td>
                        <td>{this.props.product.order_quantity || 0}</td>
                        <td><button onClick={this.toggleEditMode}>Edit Product</button></td>
                        {deleteButton}
                    </tr>
                }
            </>
        )
    }
}

export default connect()(ProductItem);