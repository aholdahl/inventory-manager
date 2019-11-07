import axios from 'axios';
import { takeEvery, put } from 'redux-saga/effects';

function* fetchProducts() {
    try {
        let response = yield axios.get('/products');
        yield put({
            type: 'SET_PRODUCTS',
            payload: response.data
        })
    } catch (error) {
        yield console.log('Error in fetchProducts: ', error)
    }
}

function* productSagaRoot() {
    yield takeEvery('FETCH_PRODUCTS', fetchProducts);
}

export default productSagaRoot;