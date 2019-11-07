import React, { Component } from 'react';
import { connect } from 'react-redux';

class Inventory extends Component {
    componentDidMount() {
        this.props.dispatch({
            type: 'FETCH_INVENTORY'
        })
    }

    render() {
        return (
            <section>
                <h2>Current Inventory</h2>
            </section>
        )
    }
}

export default connect()(Inventory);