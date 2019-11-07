import axios from 'axios';
import { takeEvery, put } from 'redux-saga/effects';
import Swal from 'sweetalert2';

//sends GET request to product.router.js then stores in productReducer
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

//sends POST request to product.router.js then sends GET request
function* addProduct(action) {
    try {
        yield axios.post('/products', action.payload)
        yield put({
            type: 'FETCH_PRODUCTS'
        })
        yield Swal.fire('Product added successfully!')
    } catch (error) {
        yield Swal.fire('Error adding product: ', error)
    }
}

//sends PUT request to product.router.js then sends GET request
function* updateProduct(action) {
    try {
        yield axios.put('/products', action.payload)
        yield put({
            type: 'FETCH_PRODUCTS'
        })
        yield Swal.fire('Product updated successfully!')
    } catch (error) {
        yield Swal.fire('Error updating product: ', error)
    }
}

//sends DELETE request to product.router.js then sends GET request
function* deleteProduct(action) {
    try {
        yield axios.delete('/products', action.payload)
        yield put({
            type: 'FETCH_PRODUCTS'
        })
        yield Swal.fire('Product deleted successfully!')
    } catch (error) {
        yield Swal.fire('Error deleting product: ', error)
    }
}

function* productSagaRoot() {
    yield takeEvery('FETCH_PRODUCTS', fetchProducts);
    yield takeEvery('ADD_NEW_PRODUCT', addProduct);
    yield takeEvery('UPDATE_PRODUCT', updateProduct);
    yield takeEvery('DELETE_PRODUCT', deleteProduct);
}

export default productSagaRoot;