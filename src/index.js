import 'core-js/features/map';
import 'core-js/features/set';
import React from 'react';
import ReactDOM from 'react-dom';
import vkconnect from '@vkontakte/vkui-connect';
import App from './App';
// import registerServiceWorker from './sw';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './store/reducers/rootReducer';
// import thunk from 'redux-thunk';
// import { reduxFirestore, getFirestore } from 'redux-firestore'; // old
// import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'; // old
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';
import firebase, { rrfConfig } from './config/firebaseConfig';

import 'firebase/auth'
import 'firebase/firestore'

// Init VK  Mini App
vkconnect.send('VKWebAppInit', {});

const store = createStore(
    rootReducer
);

// old
// const store = createStore(
//     rootReducer, 
//     compose( 
//         applyMiddleware(thunk.withExtraArgument({
//             getFirebase, getFirestore
//         })),
//         reduxFirestore(firebaseConfig),
//         reactReduxFirebase(firebaseConfig, {
//             useFirestoreForProfile: true,
//             userProfile: 'users',
//             attachAuthIsReady: true 
//         })
//     )
// );

const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance
}

const VkPsyTests = () => (
    <Provider store={ store }>
        <ReactReduxFirebaseProvider { ...rrfProps }>
            <App />
        </ReactReduxFirebaseProvider>
    </Provider>
);

ReactDOM.render(
    <VkPsyTests />, document.getElementById('root')
);

// store.firebaseAuthIsReady.then(() => {
//     ReactDOM.render(<Provider store={ store }><App /></Provider>, document.getElementById('root'));
//     serviceWorker.unregister();
// });