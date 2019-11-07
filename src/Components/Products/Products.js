import React, { Component } from 'react';
import { connect } from 'react-redux';

class Products extends Component {
    state = {
        newProductSku: '',
        newProductDescription: ''
    }
    componentDidMount() {
        this.props.dispatch({
            type: 'FETCH_PRODUCTS'
        })
    }

    handleNewProduct = (event, property)=>{
        this.setState({
            ...this.state,
            [property]: event.target.value
        })
    }

    submitNewProduct = ()=>{
        this.props.dispatch({
            type: 'ADD_NEW_PRODUCT',
            payload: {
                sku: this.state.newProductSku,
                product_description: this.state.newProductDescription
            }
        })
    }

    render() {
        console.log(this.state)
        return (
            <section>
                <h2>Products</h2>
                <h3>Add Product</h3>
                <input value={this.state.newProductSku} onChange={(event)=>{this.handleNewProduct(event, 'newProductSku')}}/>
                <input value={this.state.newProductDescription} onChange={(event)=>{this.handleNewProduct(event,'newProductDescription')}} />
                <button onClick={this.submitNewProduct}>Add</button>
                <h3>Current Products</h3>
            </section>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        store
    };
};

export default connect(mapStateToProps)(Products);