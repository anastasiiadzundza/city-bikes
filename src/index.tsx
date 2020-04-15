import React from 'react'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { createStore } from 'redux'
import { rootReducer } from './store/reducers/reducers'
import { applyMiddleware } from 'redux'
import App from './components/App'
import 'semantic-ui-css/semantic.min.css'

import { render } from 'react-dom';
import './index.scss';

const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
    )
);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
