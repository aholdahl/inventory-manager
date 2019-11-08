import React, { Component } from 'react';
import { connect } from 'react-redux';
import InventoryItem from './InventoryItem.js';
import Swal from 'sweetalert2';
import ProductMenu from '../Products/ProductMenu.js';
import BinMenu from '../Bins/BinMenu.js';

class Inventory extends Component {
    state = {
        selectedProduct: 0,
        selectedBin: 0,
        newQuantity: 0
    };

    //gets all inventory on mount
    componentDidMount() {
        this.props.dispatch({
            type: 'FETCH_INVENTORY'
        });
    };

    //captures new inventory values from inputs and saves in local state
    handleNewInventory = (event, property) => {
        this.setState({
            [property]: Number(event.target.value)
        });
    };

    //When Add Inventory button is clicked, checks if inventory already exists for that product-bin combination
    //If not already existing, local state is sent to inventorySaga to post to the database
    //Local state is reset to blanks
    submitNewInventory = () => {
        let checkInventory = this.props.inventory.filter((item) => {
            return (item.product_id === this.state.selectedProduct && item.bin_id === this.state.selectedBin)
        });
        if (this.state.newQuantity > 0 && this.state.selectedProduct > 0 && this.state.selectedBin > 0) {
            if (checkInventory.length === 0) {
                Swal.fire({
                    title: 'Please confirm',
                    text: 'Are you sure you want to add this inventory?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Save Changes'
                }).then((result) => {
                    if (result.value) {
                        this.props.dispatch({
                            type: 'ADD_NEW_INVENTORY',
                            payload: { ...this.state }
                        });
                        this.setState({
                            ...this.state,
                            selectedProduct: 0,
                            selectedBin: 0,
                            newQuantity: 0
                        });
                    };
                });
            } else {
                Swal.fire('This item is already in the bin. Please update quantity on existing inventory.')
            };
        } else {
            Swal.fire('Please select a product and bin, and enter a quantity.');
        };
    };

    //Allows user to submit using the Enter key while focus is within the Input area
    handleKeyUp = key => {
        if (key.key === 'Enter') {
            this.submitNewInventory();
        }
    };

    render() {

        //maps over array of inventory then uses InventoryItem component to render each item as a table row
        const renderInventoryItems = this.props.inventory.map((item) => {
            return (<InventoryItem key={item.inventory_id} inventory={item} />)
        });

        return (
            <section>
                <h2>Inventory</h2>
                <hr />
                <h3>Add Inventory</h3>
                {/* Uses the ProductMenu and BinMenu components to render dropdowns. */}
                <ProductMenu selectedProduct={this.state.selectedProduct} handleChange={this.handleNewInventory} />
                <BinMenu selectedBin={this.state.selectedBin} handleChange={this.handleNewInventory} />
                <input required={true} title="Quantity must be integer greater than 0" placeholder="*Enter Quantity" value={this.state.newQuantity > 0 ? this.state.newQuantity : ''} onChange={(event) => { this.handleNewInventory(event, 'newQuantity') }} onKeyUp={this.handleKeyUp} />
                <button title="Click to add new Inventory" onClick={this.submitNewInventory}>Add Inventory</button>

                <h3>Current Inventory</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>SKU</th>
                            <th>Bin</th>
                            <th>Quantity</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderInventoryItems}
                    </tbody>
                </table>
            </section>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        bins: store.binReducer,
        products: store.productReducer,
        inventory: store.inventoryReducer
    };
};

export default connect(mapStateToProps)(Inventory);