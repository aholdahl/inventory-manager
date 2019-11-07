import React, { Component } from 'react';
import { connect } from 'react-redux';
import InventoryItem from './InventoryItem.js';

class Inventory extends Component {
    state = {
        selectedProduct: 0,
        selectedBin: 0,
        newQuantity: 0
    }

    //gets all inventory, and products and bins for dropdowns, on mount
    componentDidMount() {
        this.props.dispatch({
            type: 'FETCH_BINS'
        })
        this.props.dispatch({
            type: 'FETCH_PRODUCTS'
        })
        this.props.dispatch({
            type: 'FETCH_INVENTORY'
        })
    }

    //captures new inventory values from inputs and saves in local state
    handleNewInventory = (event, property) => {
        this.setState({
            [property]: event.target.value
        })
    }

    //When Add Inventory button is clicked, local state is sent to inventorySaga to post to the database
    //Local state is reset to blanks
    submitNewInventory = () => {
        this.props.dispatch({
            type: 'ADD_NEW_INVENTORY',
            payload: { ...this.state }
        })
        this.setState({
            ...this.state,
            selectedProduct: 0,
            selectedBin: 0,
            newQuantity: 0
        })
    }

    render() {

        //maps over array of products then renders each item as a select option
        const renderProductDropdown = this.props.products.map((item) => {
            return (<option key={item.product_id} value={item.product_id}>{item.product_description} | {item.sku}</option>)
        })

        //maps over array of products then renders each item as a select option
        const renderBinDropdown = this.props.bins.map((item) => {
            return (<option key={item.bin_id} value={item.bin_id}>{item.bin_name}</option>)
        })

        //maps over array of inventory then uses InventoryItem component to render each item as a table row
        const renderInventoryItems = this.props.inventory.map((item) => {
            return (<InventoryItem key={item.inventory_id} inventory={item} />)
        })

        return (
            <section>
                <h2>Inventory</h2>

                <h3>Add Inventory</h3>
                <select value={this.state.selectedProduct} onChange={(event) => { this.handleNewInventory(event, 'selectedProduct') }}>
                    <option value={0}>Select Product</option>
                    {renderProductDropdown}
                </select>
                <select value={this.state.selectedBin} onChange={(event) => { this.handleNewInventory(event, 'selectedBin') }}>
                    <option value={0}>Select Bin</option>
                    {renderBinDropdown}
                </select>
                <input placeholder="Enter Quantity" value={this.state.newQuantity > 0 ? this.state.newQuantity : ''} onChange={(event) => { this.handleNewInventory(event, 'newQuantity') }} />
                <button onClick={this.submitNewInventory}>Add Inventory</button>

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