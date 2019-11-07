import React, { Component } from 'react';
import { connect } from 'react-redux';

class ProductItem extends Component {

    render() {
        return (
            <tr>
                <td>{this.props.product.product_description}</td>
                <td>{this.props.product.sku}</td>
                <td>{this.props.product.inventory_quantity || 0}</td>
                <td>{this.props.product.order_quantity || 0}</td>
            </tr>
        )
    }
}

export default connect()(ProductItem);