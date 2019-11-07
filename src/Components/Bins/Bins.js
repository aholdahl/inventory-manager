import React, { Component } from 'react';
import { connect } from 'react-redux';

class Bins extends Component {
    componentDidMount() {
        this.props.dispatch({
            type: 'FETCH_BINS'
        })
    }

    render() {
        return (
            <section>
                <h2>Current Bins</h2>
            </section>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        store
    };
};

export default connect(mapStateToProps)(Bins);