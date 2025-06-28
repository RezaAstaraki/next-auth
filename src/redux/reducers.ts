// src/redux/reducers.js
import { combineReducers } from 'redux';
// import { persistReducer } from 'redux-persist';
import modalReducer from './features/modal/modalSlice';


// Configuration for Redux Persist, which allows state to persist between page reloads
const rootPersistConfig = {
    key: 'root',
    // storage,
};

// Configuration specifically for the members slice
const membersPersistConfig = {
    key: 'members',
    // storage,
    // You can add blacklist or whitelist properties here if needed
};

// Combining all the reducers into one root reducer
const rootReducer = combineReducers({
    modal: modalReducer,
});

// Applying persistence configuration to the rootReducer, making it persistent based on the settings in rootPersistConfig
// export default persistReducer(rootPersistConfig, rootReducer);
