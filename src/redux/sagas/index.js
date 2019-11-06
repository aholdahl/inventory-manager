import { all } from 'redux-saga/effects';
import inventorySaga from './inventorySaga.js';

function* rootSaga() {
    yield all([
        inventorySaga(),
    ])
}

export default rootSaga;