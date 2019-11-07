import React, { Component } from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';

class BinItem extends Component {
    state = {
        binName: '',
        editMode: false
    }

    //When Edit button is clicked, stores bin prop in local state and renders as inputs.
    //When Save button is clicked, renders as text
    toggleEditMode = () => {
        this.setState({
            ...this.state,
            binName: this.props.bin.bin_name,
            editMode: !this.state.editMode
        })
    }

    //In Edit mode, captures any changes to the input values and stores in local state
    handleBinChange = (event) => {
        this.setState({
            ...this.state,
            binName: event.target.value
        })
    }

    //When Save button is clicked, confirmation dialog will appear
    //Upon confirmation, local state is sent to binSaga to update the database
    //State returns to editMode: false
    saveBinChanges = () => {
        Swal.fire({
            title: 'Please confirm',
            text: 'Are you sure you want to update this bin?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Save Changes'
        }).then((result) => {
            if (result.value) {
                this.props.dispatch({
                    type: 'UPDATE_BIN',
                    payload: {
                        ...this.state,
                        binId: this.props.bin.bin_id
                    }
                })
            }
            this.toggleEditMode()
        })
    }

    //When Delete button is clicked, confirmation dialog will appear
    //Upon confirmation, bin id is sent to binSaga to delete in the database
    deleteBin = () => {
        Swal.fire({
            title: 'Please confirm',
            text: 'Are you sure you want to delete this bin?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Delete'
        }).then((result) => {
            if (result.value) {
                this.props.dispatch({
                    type: 'DELETE_BIN',
                    payload: { binId: this.props.bin.bin_id }
                })
            }
        })
    }

    render() {

        //delete button will only appear if the inventory_contents are empty
        const deleteButton = this.props.bin.inventory_contents[0] === null
            ? <td><button onClick={this.deleteBin}>Delete</button></td>
            : <td></td>

        return (
            <>
                {/* If inventory contents are [NULL], render (empty) */}
                {this.state.editMode ?
                    <tr>
                        <td><input value={this.state.binName} onChange={this.handleBinChange} /></td>
                        <td>{this.props.bin.inventory_contents[0] === null ? '(empty)' :
                            this.props.bin.inventory_contents.map((item) => {
                                return (<p>{item.quantity} {item.product_description}{item.quantity > 1 && 's'}</p>)
                            })}</td>
                        <td><button onClick={this.saveBinChanges}>Save</button></td>
                        {deleteButton}
                    </tr>
                    :
                    <tr>
                        <td>{this.props.bin.bin_name}</td>
                        <td>{this.props.bin.inventory_contents[0] === null ? '(Empty)' :
                            this.props.bin.inventory_contents.map((item) => {
                                return (<p>{item.product_description}</p>)
                            })}</td>
                        <td><button onClick={this.toggleEditMode}>Edit Bin</button></td>
                        {deleteButton}
                    </tr>
                }
            </>

        )
    }
}

export default connect()(BinItem);