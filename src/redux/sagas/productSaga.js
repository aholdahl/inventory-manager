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

function* addProduct(action){
    try {
        yield axios.post('/products', action.payload)
        yield put({
            type: 'FETCH_PRODUCTS'
        })
    } catch (error) {
        yield console.log('Error in addProduct: ', error)
    }
}

function* productSagaRoot() {
    yield takeEvery('FETCH_PRODUCTS', fetchProducts);
    yield takeEvery('ADD_NEW_PRODUCT', addProduct);
}

export default productSagaRoot;