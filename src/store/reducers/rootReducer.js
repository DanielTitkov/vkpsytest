// import authReducer from './authReducer';
// import projectReducer from './projectReducer';
import panelReducer from './panelReducer';
import { combineReducers } from 'redux';
import inventoryReducer from './inventoryReducer';

const rootReducer = combineReducers({
    // auth: authReducer,
    // project: projectReducer,
    panel: panelReducer,
    inventory: inventoryReducer
});

export default rootReducer;