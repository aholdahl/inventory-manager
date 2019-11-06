import axios from 'axios';
import { takeEvery, put } from 'redux-saga/effects';

function* fetchInventory() {
    try {
        let response = yield axios.get('/inventory');
        yield put({
            type: 'SET_INVENTORY',
            payload: response.data
        })
    } catch (error) {
        yield console.log('Error in fetchInventory: ', error)
    }
}

function* inventorySagaRoot() {
    yield takeEvery('FETCH_INVENTORY', fetchInventory);
}

export default inventorySagaRoot;