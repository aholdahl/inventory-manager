import React, { Component } from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';

class ProductItem extends Component {
    state = {
        sku: '',
        productDescription: '',
        editMode: false
    };

    //When Edit button is clicked, stores product prop in local state and renders as inputs.
    //When Save button is clicked, renders as text
    toggleEditMode = () => {
        this.setState({
            ...this.state,
            sku: this.props.product.sku,
            productDescription: this.props.product.product_description,
            editMode: !this.state.editMode
        });
    };

    //In Edit mode, captures any changes to the input values and stores in local state
    handleProductChange = (event, property) => {
        this.setState({
            ...this.state,
            [property]: event.target.value
        });
    };

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
                });
            };
            this.toggleEditMode();
        });
    };

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
                });
            };
        });
    };

    //Allows user to submit using the Enter key while focus is within the Input area
    handleKeyUp = key => {
        if (key.key === 'Enter') {
            this.saveProductChanges();
        }
    };

    render() {

        //delete button will only appear if there are 0 in stock and 0 pending orders
        const deleteButton = !this.props.product.inventory_quantity && !this.props.product.order_quantity
            ? <td><button title="Click to delete this Product" onClick={this.deleteProduct}>Delete Product</button></td>
            : <td></td>

        return (
            <>
                {/* If either quantity is NULL, render 0 */}
                {this.state.editMode
                    ?
                    <tr>
                        <td><input required={true} title="Product Description is required" placeholder="*Product Description" value={this.state.productDescription} onChange={(event) => { this.handleProductChange(event, 'productDescription') }} onKeyUp={this.handleKeyUp} /></td>
                        <td><input required={true} title="SKU is required" placeholder="*SKU" value={this.state.sku} onChange={(event) => { this.handleProductChange(event, 'sku') }} onKeyUp={this.handleKeyUp} /></td>
                        <td>{this.props.product.inventory_quantity || 0}</td>
                        <td>{this.props.product.order_quantity || 0}</td>
                        <td><button title="Click to save changes to this Product" onClick={this.saveProductChanges}>Save Changes</button>
                            <button title="Click to cancel changes to this product" onClick={this.toggleEditMode}>Cancel</button>
                        </td>
                        {deleteButton}
                    </tr>
                    :
                    <tr>
                        <td>{this.props.product.product_description}</td>
                        <td>{this.props.product.sku}</td>
                        <td>{this.props.product.inventory_quantity || 0}</td>
                        <td>{this.props.product.order_quantity || 0}</td>
                        <td><button title="Click to edit this Product" onClick={this.toggleEditMode}>Edit Product</button></td>
                        {deleteButton}
                    </tr>
                }
            </>
        )
    }
}

export default connect()(ProductItem);