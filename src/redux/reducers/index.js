import { combineReducers } from 'redux';
import inventoryReducer from './inventoryReducer.js';

const rootReducer = combineReducers({
    inventoryReducer,
});

export default rootReducer;