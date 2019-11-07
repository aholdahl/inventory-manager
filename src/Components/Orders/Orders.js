import React, { Component } from 'react';
import { connect } from 'react-redux';

class Orders extends Component {
    componentDidMount() {
        this.props.dispatch({
            type: 'FETCH_ORDERS'
        })
    }

    render() {
        return (
            <section>
                <h2>Current Orders</h2>
            </section>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        store
    };
};

export default connect(mapStateToProps)(Orders);