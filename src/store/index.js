import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
// import thunkMiddleware from 'redux-thunk';
import AppReducer from './reducers';
// import { callAPIMiddleware } from '../middleware/api';
// import analyticsMiddleware from '../middleware/analytics';
import { GA_TRACKING_ID } from '../consts';

const initialState = {};
const enhancers = [];
const middleware = applyMiddleware();
//   callAPIMiddleware,
//   thunkMiddleware,
//   analyticsMiddleware({ trackingId: GA_TRACKING_ID })

// add middleware for Chrome devToolsExtension
if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension;
  if (typeof devToolsExtension === 'function') enhancers.push(devToolsExtension());
}

const composed = compose(middleware, ...enhancers);
const store = createStore(AppReducer, initialState, composed);

export default function initStore() {
  return new Promise(fulfill => persistStore(store, {}, () => fulfill(store)));
  // persistStore(store).purge(); // use this to reset
}
