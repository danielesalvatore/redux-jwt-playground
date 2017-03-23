import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware  } from 'redux'
import { Provider } from 'react-redux'
import App from './containers/App'
import quotesApp from './reducers/index'
import thunk from 'redux-thunk'
import api from './middleware/api'
import jwt from './middleware/jwt'
import createLogger from 'redux-logger';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let createStoreWithMiddleware = composeEnhancers(applyMiddleware(jwt, api, thunk ))(createStore)

let store = createStoreWithMiddleware(quotesApp)

let rootElement = document.getElementById('root')

render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
)
