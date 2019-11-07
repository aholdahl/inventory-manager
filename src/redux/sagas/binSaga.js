import axios from 'axios';
import { takeEvery, put } from 'redux-saga/effects';
import Swal from 'sweetalert2';

//sends GET request to bin.router.js then stores in binReducer
function* fetchBins() {
    try {
        let response = yield axios.get('/bins');
        yield put({
            type: 'SET_BINS',
            payload: response.data
        })
    } catch (error) {
        yield Swal.fire('Error getting bins.')
    }
}

//sends POST request to bin.router.js then sends GET request
function* addNewBin(action) {
    try {
        yield axios.post('/bins', action.payload)
        yield put({
            type: 'FETCH_BINS'
        })
        yield Swal.fire('Bin added successfully!')
    } catch (error) {
        yield Swal.fire('Error adding bin.')
    }
}

//sends PUT request to bin.router.js then sends GET request
function* updateBin(action) {
    try {
        yield axios.put('/bins', action.payload)
        yield put({
            type: 'FETCH_BINS'
        })
        yield Swal.fire('Bin updated successfully!')
    } catch (error) {
        yield Swal.fire('Error updating bin.')
    }
}

//sends DELETE request to product.router.js then sends GET request
function* deleteBin(action) {
    try {
        yield axios.delete(`/bins/${action.payload.binId}`)
        yield put({
            type: 'FETCH_BINS'
        })
        yield Swal.fire('Bin deleted successfully!')
    } catch (error) {
        yield Swal.fire('Error deleting bin.')
    }
}

function* binSagaRoot() {
    yield takeEvery('FETCH_BINS', fetchBins);
    yield takeEvery('ADD_NEW_BIN', addNewBin);
    yield takeEvery('UPDATE_BIN', updateBin);
    yield takeEvery('DELETE_BIN', deleteBin);
}

export default binSagaRoot;