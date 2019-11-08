import React, { Component } from 'react';
import { connect } from 'react-redux';

class ProductMenu extends Component {

    componentDidMount() {
        this.props.dispatch({
            type: 'FETCH_PRODUCTS'
        });
    };

    render() {

        //maps over array of products then renders each item as a select option
        const renderProductDropdown = this.props.products.map((item) => {
            return (<option key={item.product_id} value={item.product_id}>{item.product_description} | {item.sku}</option>)
        });

        return (
            <select required={true} title="Please select a product" value={this.props.selectedProduct} onChange={(event) => { this.props.handleChange(event, 'selectedProduct') }}>
                <option value={0}>*Select Product</option>
                {renderProductDropdown}
            </select>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        products: store.productReducer
    };
};

export default connect(mapStateToProps)(ProductMenu);