// import authReducer from './authReducer';
// import projectReducer from './projectReducer';
import panelReducer from './panelReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import testReducer from './testReducer';
import inventoryReducer from './inventoryReducer';

const rootReducer = combineReducers({
    // auth: authReducer,
    // project: projectReducer,
    panel: panelReducer,
    test: testReducer,
    inventory: inventoryReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});

export default rootReducer;