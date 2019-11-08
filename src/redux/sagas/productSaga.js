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
        });
    } catch (error) {
        yield Swal.fire('Error getting products.');
    };
};

//sends POST request to product.router.js then sends GET request
function* addNewProduct(action) {
    try {
        yield axios.post('/products', action.payload);
        yield put({
            type: 'FETCH_PRODUCTS'
        });
        yield Swal.fire('Product added successfully!');
    } catch (error) {
        yield Swal.fire('Error adding product.');
    };
};

//sends PUT request to product.router.js then sends GET request
function* updateProduct(action) {
    try {
        yield axios.put('/products', action.payload);
        yield put({
            type: 'FETCH_PRODUCTS'
        });
        yield Swal.fire('Product updated successfully!');
    } catch (error) {
        yield Swal.fire('Error updating product.');
    };
};

//sends DELETE request to product.router.js then sends GET request
function* deleteProduct(action) {
    try {
        yield console.log(action.payload);
        yield axios.delete(`/products/${action.payload.productId}`);
        yield put({
            type: 'FETCH_PRODUCTS'
        });
        yield Swal.fire('Product deleted successfully!');
    } catch (error) {
        yield Swal.fire('Error deleting product.');
    };
};

function* productSagaRoot() {
    yield takeEvery('FETCH_PRODUCTS', fetchProducts);
    yield takeEvery('ADD_NEW_PRODUCT', addNewProduct);
    yield takeEvery('UPDATE_PRODUCT', updateProduct);
    yield takeEvery('DELETE_PRODUCT', deleteProduct);
};

export default productSagaRoot;