import axios from 'axios';
import { takeEvery, put } from 'redux-saga/effects';

function* fetchOrders() {
    try {
        let response = yield axios.get('/orders');
        yield put({
            type: 'SET_ORDERS',
            payload: response.data
        })
    } catch (error) {
        yield console.log('Error in fetchOrders: ', error)
    }
}

function* orderSagaRoot() {
    yield takeEvery('FETCH_ORDERS', fetchOrders);
}

export default orderSagaRoot;