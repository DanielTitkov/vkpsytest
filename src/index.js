import 'core-js/features/map';
import 'core-js/features/set';
import React from 'react';
import ReactDOM from 'react-dom';
import connect from '@vkontakte/vkui-connect';
import App from './App';
// import registerServiceWorker from './sw';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './store/reducers/rootReducer';
import thunk from 'redux-thunk';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import firebaseConfig from './config/firebaseConfig';

// Init VK  Mini App
connect.send('VKWebAppInit', {});

// Если вы хотите, чтобы ваше веб-приложение работало в оффлайне и загружалось быстрее,
// расскомментируйте строку с registerServiceWorker();
// Но не забывайте, что на данный момент у технологии есть достаточно подводных камней
// Подробнее про сервис воркеры можно почитать тут — https://vk.cc/8MHpmT
// registerServiceWorker();

const store = createStore(
    rootReducer, 
    compose( 
        applyMiddleware(thunk.withExtraArgument({
            getFirebase, getFirestore
        })),
        reduxFirestore(firebaseConfig),
        reactReduxFirebase(firebaseConfig, {
            useFirestoreForProfile: true,
            userProfile: 'users',
            attachAuthIsReady: true 
        })
    )
);

ReactDOM.render(<Provider store={ store }><App /></Provider>, document.getElementById('root'));
// store.firebaseAuthIsReady.then(() => {
//     ReactDOM.render(<Provider store={ store }><App /></Provider>, document.getElementById('root'));
//     serviceWorker.unregister();
// });