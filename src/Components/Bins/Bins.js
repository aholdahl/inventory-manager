import React, { Component } from 'react';
import { connect } from 'react-redux';
import BinItem from './BinItem.js';
import Swal from 'sweetalert2';

class Bins extends Component {
    state = {
        binName: ''
    }

    //gets all bins and inventory contents on mount
    componentDidMount() {
        this.props.dispatch({
            type: 'FETCH_BINS'
        })
    }

    //captures new bin values from inputs and saves in local state
    handleNewBin = (event) => {
        this.setState({
            ...this.state,
            binName: event.target.value
        })
    }

    //When Add Bin button is clicked, confirmation dialog will open
    //Upon confirmation, local state is sent to binSaga to post to the database
    //Local state is reset to blanks
    submitNewBin = () => {
        if (this.state.binName) {
            Swal.fire({
                title: 'Please confirm',
                text: 'Are you sure you want to add this product?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Save Changes'
            }).then((result) => {
                if (result.value) {
                    this.props.dispatch({
                        type: 'ADD_NEW_BIN',
                        payload: { ...this.state }
                    })
                    this.setState({
                        ...this.state,
                        binName: ''
                    })
                }
            })
        } else {
            Swal.fire('Please enter the bin name.')
        }
    }

    render() {

        //maps over array of bins then uses BinItem component to render each item as a table row
        const renderBinItems = this.props.bins.map((item) => {
            return (<BinItem key={item.bin_id} bin={item} />)
        })

        return (
            <section>
                <h2>Bins</h2>
                <hr />
                <h3>Add Bin</h3>
                <input placeholder="Bin Name" value={this.state.binName} onChange={this.handleNewBin} />
                <button onClick={this.submitNewBin}>Add Bin</button>

                <h3>Current Bins</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Bin Name</th>
                            <th>Contents</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderBinItems}
                    </tbody>
                </table>
            </section>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        bins: store.binReducer
    };
};

export default connect(mapStateToProps)(Bins);