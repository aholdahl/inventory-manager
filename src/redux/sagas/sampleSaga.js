import axios from 'axios';
import { takeEvery } from 'redux-saga/effects';

function* sampleSaga() {
    try {
        yield console.log('Hello from sampleSaga')
    } catch (error) {
        yield console.log('Error in sampleSaga: ', error)
    }
}

function* sampleSagaRoot() {
    yield takeEvery('SAMPLE_SAGA', sampleSaga);
}

export default sampleSagaRoot;