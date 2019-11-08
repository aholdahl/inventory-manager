import React, { Component } from 'react';
import { connect } from 'react-redux';

class BinMenu extends Component {
    
    //gets all bins and inventory contents on mount
    componentDidMount() {
        this.props.dispatch({
            type: 'FETCH_BINS'
        })
    }

    render() {

        //maps over array of bins then renders each item as a select option
        const renderBinDropdown = this.props.bins.map((item) => {
            return (<option key={item.bin_id} value={item.bin_id}>{item.bin_name}</option>)
        })

        return (
            <select value={this.props.selectedBin} onChange={(event) => { this.props.handleChange(event, 'selectedBin') }}>
                <option value={0}>Select Bin</option>
                {renderBinDropdown}
            </select>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        bins: store.binReducer
    };
};

export default connect(mapStateToProps)(BinMenu);