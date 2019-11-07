import { all } from 'redux-saga/effects';
import binSaga from './binSaga.js';
import inventorySaga from './inventorySaga.js';
import orderSaga from './orderSaga.js';
import productSaga from './productSaga.js';

function* rootSaga() {
    yield all([
        binSaga(),
        inventorySaga(),
        orderSaga(),
        productSaga(),
    ])
}

export default rootSaga;