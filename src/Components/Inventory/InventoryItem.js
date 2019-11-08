import React, { Component } from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';

class InventoryItem extends Component {
    state = {
        quantity: 0,
        editMode: false
    };

    //When Edit button is clicked, stores inventory prop in local state and renders as inputs.
    //When Save button is clicked, renders as text
    toggleEditMode = () => {
        this.setState({
            ...this.state,
            quantity: this.props.inventory.quantity,
            editMode: !this.state.editMode
        });
    };

    //In Edit mode, captures any changes to the input values and stores in local state
    handleInventoryChange = (event) => {
        this.setState({
            ...this.state,
            quantity: event.target.value
        });
    };

    //When Save button is clicked, quantity is checked for greater than 0
    //If less than zero, request is diverted to deleteInventory function instead
    //If greater than 0, confirmation dialog will appear
    //Upon confirmation, local state is sent to inventorySaga to update the database
    //State returns to editMode: false
    saveInventoryChanges = () => {
        if (this.state.quantity > 0) {
            Swal.fire({
                title: 'Please confirm',
                text: 'Are you sure you want to update this inventory?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Save Changes'
            }).then((result) => {
                if (result.value) {
                    this.props.dispatch({
                        type: 'UPDATE_INVENTORY',
                        payload: {
                            ...this.state,
                            inventoryId: this.props.inventory.inventory_id
                        }
                    });
                };
            });
        } else {
            this.deleteInventory();
        };
        this.toggleEditMode();
    };

    //When Delete button is clicked, confirmation dialog will appear
    //Upon confirmation, inventory id is sent to inventorySaga to delete in the database
    deleteInventory = () => {
        Swal.fire({
            title: 'Please confirm',
            text: 'Are you sure you want to delete this inventory?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Delete'
        }).then((result) => {
            if (result.value) {
                this.props.dispatch({
                    type: 'DELETE_INVENTORY',
                    payload: { inventoryId: this.props.inventory.inventory_id }
                });
            };
        });
    };

    //Allows user to submit using the Enter key while focus is within the Input area
    handleKeyUp = key => {
        if (key.key === 'Enter') {
            this.saveInventoryChanges();
        }
    };

    render() {
        return (
            <>
                {this.state.editMode ?
                    <tr>
                        <td>{this.props.inventory.product_description}</td>
                        <td>{this.props.inventory.sku}</td>
                        <td>{this.props.inventory.bin_name}</td>
                        <td><input required={true} title="Quantity must be integer greater than 0" placeholder="*Enter Quantity" value={this.state.quantity} onChange={this.handleInventoryChange} onKeyUp={this.handleKeyUp} /></td>
                        <td><button title="Click to save changes to this Inventory" onClick={this.saveInventoryChanges}>Save</button><button title="Click to cancel changes to this Inventory" onClick={this.toggleEditMode}>Cancel</button></td>
                        <td><button title="Click to delete this Inventory" onClick={this.deleteInventory}>Delete Inventory</button></td>
                    </tr>
                    :
                    <tr>
                        <td>{this.props.inventory.product_description}</td>
                        <td>{this.props.inventory.sku}</td>
                        <td>{this.props.inventory.bin_name}</td>
                        <td>{this.props.inventory.quantity}</td>
                        <td><button title="Click to edit this Inventory" onClick={this.toggleEditMode}>Edit Inventory</button></td>
                        <td><button title="Click to delete this Inventory" onClick={this.deleteInventory}>Delete Inventory</button></td>
                    </tr>
                }
            </>
        )
    }
}

export default connect()(InventoryItem);