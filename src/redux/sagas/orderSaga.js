import axios from 'axios';
import { takeEvery, put } from 'redux-saga/effects';
import Swal from 'sweetalert2';

function* fetchOrders() {
    try {
        let response = yield axios.get('/orders');
        yield put({
            type: 'SET_ORDERS',
            payload: response.data
        })
    } catch (error) {
        yield Swal.fire('Error getting orders.')
    }
}

function* orderSagaRoot() {
    yield takeEvery('FETCH_ORDERS', fetchOrders);
}

export default orderSagaRoot;