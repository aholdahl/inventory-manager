import { combineReducers } from 'redux';
import binReducer from './binReducer.js';
import inventoryReducer from './inventoryReducer.js';
import orderLineReducer from './orderLineReducer.js';
import orderReducer from './orderReducer.js';
import productReducer from './productReducer.js';

const rootReducer = combineReducers({
    binReducer,
    inventoryReducer,
    orderLineReducer,
    orderReducer,
    productReducer,
});

export default rootReducer;