import axios from 'axios';
import { takeEvery, put } from 'redux-saga/effects';
import Swal from 'sweetalert2';

//sends GET request to inventory.router.js then stores in inventoryReducer
function* fetchInventory() {
    try {
        let response = yield axios.get('/inventory');
        yield put({
            type: 'SET_INVENTORY',
            payload: response.data
        });
    } catch (error) {
        yield Swal.fire('Error getting inventory.');
    };
};

//sends POST request to inventory.router.js then sends GET request
function* addNewInventory(action) {
    try {
        yield axios.post('/inventory', action.payload);
        yield put({
            type: 'FETCH_INVENTORY'
        });
        yield Swal.fire('Inventory added successfully!');
    } catch (error) {
        yield Swal.fire('Error adding inventory.');
    };
};

//sends PUT request to inventory.router.js then sends GET request
function* updateInventory(action) {
    try {
        yield axios.patch('/inventory', action.payload);
        yield put({
            type: 'FETCH_INVENTORY'
        });
        yield Swal.fire('Inventory updated successfully!');
    } catch (error) {
        yield Swal.fire('Error updating inventory.');
    };
};

//sends DELETE request to inventory.router.js then sends GET request
function* deleteInventory(action) {
    try {
        yield console.log(action.payload);
        yield axios.delete(`/inventory/${action.payload.inventoryId}`);
        yield put({
            type: 'FETCH_INVENTORY'
        });
        yield Swal.fire('Inventory deleted successfully!');
    } catch (error) {
        yield Swal.fire('Error deleting inventory.');
    };
};

function* inventorySagaRoot() {
    yield takeEvery('FETCH_INVENTORY', fetchInventory);
    yield takeEvery('ADD_NEW_INVENTORY', addNewInventory);
    yield takeEvery('UPDATE_INVENTORY', updateInventory);
    yield takeEvery('DELETE_INVENTORY', deleteInventory);
};

export default inventorySagaRoot;