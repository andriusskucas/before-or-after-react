
import { applyMiddleware, createStore } from 'redux';
import combinedReducers from './reducers';
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import appState from'./app-state'

const middleware = applyMiddleware (thunk, logger());
const store = createStore(combinedReducers, appState, middleware);

export default store