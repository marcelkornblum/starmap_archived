import { createStore as reduxCreateStore, applyMiddleware, compose } from 'redux';
import AppReducer from './reducers';
import { GA_TRACKING_ID } from '../consts';

const initialState = {};
const enhancers = [];
const middleware = applyMiddleware();

// add middleware for Chrome devToolsExtension
if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension;
  if (typeof devToolsExtension === 'function') enhancers.push(devToolsExtension());
}

const composed = compose(middleware, ...enhancers);
const createStore = () => reduxCreateStore(AppReducer, initialState, composed);

export default createStore;
