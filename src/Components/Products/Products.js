import React, { Component } from 'react';
import { connect } from 'react-redux';

class Products extends Component {
    componentDidMount() {
        this.props.dispatch({
            type: 'FETCH_PRODUCTS'
        })
    }

    render() {
        return (
            <section>
                <h2>Current Products</h2>
            </section>
        )
    }
}

export default connect()(Products);