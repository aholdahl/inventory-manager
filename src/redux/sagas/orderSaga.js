import axios from 'axios';
import { takeEvery, put } from 'redux-saga/effects';
import Swal from 'sweetalert2';

//sends GET request to order.router.js then stores in orderReducer
function* fetchOrders() {
    try {
        let response = yield axios.get('/orders');
        yield put({
            type: 'SET_ORDERS',
            payload: response.data
        });
    } catch (error) {
        yield Swal.fire('Error getting orders.');
    };
};

//sends POST request to order.router.js then sends GET request
function* submitOrder(action) {
    try {
        yield axios.post('/orders', action.payload);
        yield put({
            type: 'FETCH_ORDERS'
        });
        yield Swal.fire('Order submitted successfully!');
    } catch (error) {
        yield Swal.fire('Error submitting order.');
    };
};

//sends DELETE request to order.router.js to delete order and all remaining order line items, then sends GET request
function* deleteOrder(action) {
    try {
        yield axios.delete(`/orders/${action.payload.orderId}`);
        yield put({
            type: 'FETCH_ORDERS'
        });
        yield Swal.fire('Order deleted successfully!');
    } catch (error) {
        yield Swal.fire('Error deleting order.');
    };
};

//sends DELETE request to order.router.js to delete order line item then sends GET request
function* deleteOrderLine(action) {
    try {
        yield axios.delete(`/orders/line/${action.payload.orderLineId}`);
        yield put({
            type: 'FETCH_ORDERS'
        });
        yield Swal.fire('Order item deleted successfully!');
    } catch (error) {
        yield Swal.fire('Error deleting order item.');
    };
};

function* orderSagaRoot() {
    yield takeEvery('FETCH_ORDERS', fetchOrders);
    yield takeEvery('SUBMIT_ORDER', submitOrder);
    yield takeEvery('DELETE_ORDER', deleteOrder);
    yield takeEvery('DELETE_ORDER_LINE', deleteOrderLine);
};

export default orderSagaRoot;