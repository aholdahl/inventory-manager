import React, { Component } from 'react';
import { connect } from 'react-redux';

class InventoryItem extends Component {
    state = {
        editMode: false
    }
    render() {
        return (
            <>
            { this.state.editMode ?
                <tr>
                    <td>{this.props.inventory.product_description}</td>
                    <td>{this.props.inventory.sku}</td>
                    <td>{this.props.inventory.bin_name}</td>
                    <td><input value={this.props.inventory.quantity} /></td>
                    <td><button>Save</button></td>
                    <td><button>Delete Inventory</button></td>
                </tr>
            :
                <tr>
                    <td>{this.props.inventory.product_description}</td>
                    <td>{this.props.inventory.sku}</td>
                    <td>{this.props.inventory.bin_name}</td>
                    <td>{this.props.inventory.quantity}</td>
                    <td><button>Edit Inventory</button></td>
                    <td><button>Delete Inventory</button></td>
                </tr>
            }
            </>
        )
    }
}

export default connect()(InventoryItem);