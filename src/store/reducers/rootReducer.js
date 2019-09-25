import panelReducer from './panelReducer';
import { combineReducers } from 'redux';
import inventoryReducer from './inventoryReducer';
import validationReducer from './validationReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
    panel: panelReducer,
    inventory: inventoryReducer,
    validation: validationReducer,
    user: userReducer,
});

export default rootReducer;