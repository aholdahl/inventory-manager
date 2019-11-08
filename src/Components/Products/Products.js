import React, { Component } from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import ProductItem from './ProductItem.js';

class Products extends Component {
    state = {
        newProductSku: '',
        newProductDescription: ''
    };

    //gets all products and quantities on mount
    componentDidMount() {
        this.props.dispatch({
            type: 'FETCH_PRODUCTS'
        });
    };

    //captures new product values from inputs and saves in local state
    handleNewProduct = (event, property) => {
        this.setState({
            ...this.state,
            [property]: event.target.value
        });
    };

    //When Add Product button is clicked, a confirmation dialog will open
    //Upon confirmation, local state is sent to productSaga to post to the database
    //Local state is reset to blanks
    submitNewProduct = () => {
        if (this.state.newProductDescription && this.state.newProductSku) {
            Swal.fire({
                title: 'Please confirm',
                text: 'Are you sure you want to add this product?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Save Changes'
            }).then((result) => {
                if (result.value) {
                    this.props.dispatch({
                        type: 'ADD_NEW_PRODUCT',
                        payload: { ...this.state }
                    });
                    this.setState({
                        ...this.state,
                        newProductSku: '',
                        newProductDescription: ''
                    });
                };
            });
        } else {
            Swal.fire('Please complete both the description and the SKU fields.')
        };
    };

    render() {

        //maps over array of products then uses ProductItem component to render each item as a table row
        const renderProductItems = this.props.products.map((item) => {
            return (<ProductItem key={item.product_id} product={item} />)
        });

        return (
            <section>
                <h2>Products</h2>
                <hr />
                <h3>Add Product</h3>
                <input placeholder="Product Description" value={this.state.newProductDescription} onChange={(event) => { this.handleNewProduct(event, 'newProductDescription') }} />
                <input placeholder="SKU" value={this.state.newProductSku} onChange={(event) => { this.handleNewProduct(event, 'newProductSku') }} />
                <button onClick={this.submitNewProduct}>Add Product</button>

                <h3>Current Products</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Product Description</th>
                            <th>SKU</th>
                            <th># In Stock</th>
                            <th># Ordered</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderProductItems}
                    </tbody>
                </table>
            </section>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        products: store.productReducer
    };
};

export default connect(mapStateToProps)(Products);