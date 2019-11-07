import React, { Component } from 'react';
import { connect } from 'react-redux';

class OrderLines extends Component {

    render() {
        return (
            <section>
                <h4>Current Order Lines</h4>
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