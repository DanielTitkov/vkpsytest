import 'core-js/features/map';
import 'core-js/features/set';
import React from 'react';
import ReactDOM from 'react-dom';
import vkconnect from '@vkontakte/vk-connect';
import App from './App';
// import registerServiceWorker from './sw';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './store/reducers/rootReducer';

import thunk from 'redux-thunk';

// Init VK  Mini App
vkconnect.send('VKWebAppInit', {});

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

const VkPsyTests = () => (
    <Provider store={ store }>
        <App />
    </Provider>
);

ReactDOM.render(
    <VkPsyTests />, document.getElementById('root')
);
