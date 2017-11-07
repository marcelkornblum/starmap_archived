import { combineReducers } from 'redux';

import regionMap from './regionMap/reducer';
import stars from './stars/reducer';

const reducers = combineReducers({
  regionMap,
  stars,
});

export default reducers;
