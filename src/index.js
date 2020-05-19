import React from 'react';
import ReactDOM from 'react-dom';

import {createStore} from 'redux';
import {Provider} from 'react-redux';

import './index.css';
import App from './App';
import rootReducer from './store/reducers/root'
import middleware from './middleware'


const store = createStore(rootReducer, middleware);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);