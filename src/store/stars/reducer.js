import { handleActions } from 'redux-actions';

import * as stars from './actions';

export const initialState = {
  stars: [],
};

export default handleActions(
  {
    [stars.setStarData]: (state, action) => {
      return {
        ...state,
        stars: action.payload,
      };
    },
  },
  initialState
);
