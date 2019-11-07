import axios from 'axios';
import { takeEvery, put } from 'redux-saga/effects';

function* fetchOrderLines() {
    try {
        let response = yield axios.get('/orders/lines');
        yield put({
            type: 'SET_ORDER_LINES',
            payload: response.data
        })
    } catch (error) {
        yield console.log('Error in fetchOrderLines: ', error)
    }
}

function* orderLineSagaRoot() {
    yield takeEvery('FETCH_ORDER_LINES', fetchOrderLines);
}

export default orderLineSagaRoot;