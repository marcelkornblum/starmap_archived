import { handleActions } from 'redux-actions';

import * as stars from './actions';

export const initialState = {
  stars: [],
};

export default handleActions(
  {
    [stars.setStarData]: (state, action) => ({
      ...state,
      stars: action.payload.map(i => i.node),
    }),
  },
  initialState
);
