import axios from 'axios';
import { takeEvery, put } from 'redux-saga/effects';

function* fetchBins() {
    try {
        let response = yield axios.get('/bins');
        yield put({
            type: 'SET_BINS',
            payload: response.data
        })
    } catch (error) {
        yield console.log('Error in fetchBins: ', error)
    }
}

function* binSagaRoot() {
    yield takeEvery('FETCH_BINS', fetchBins);
}

export default binSagaRoot;