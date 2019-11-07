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

const mapStateToProps = (store) => {
    return {
        store
    };
};

export default connect(mapStateToProps)(Inventory);