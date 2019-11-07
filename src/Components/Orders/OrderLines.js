import React, { Component } from 'react';
import { connect } from 'react-redux';

class OrderLines extends Component {
    componentDidMount() {
        this.props.dispatch({
            type: 'FETCH_ORDER_LINES'
        })
    }

    render() {
        return (
            <section>
                <h2>Current Order Lines</h2>
            </section>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        store
    };
};

export default connect(mapStateToProps)(OrderLines);