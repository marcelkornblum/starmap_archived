import { combineReducers } from 'redux';

import regionMap from './regionMap/reducer';

const reducers = combineReducers({
  regionMap,
});

export default reducers;
