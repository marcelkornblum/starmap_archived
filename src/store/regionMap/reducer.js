import * as THREE from 'three';

import * as actions from './actions';

export const initialState = {
  gridRotation: new THREE.Euler(),
  counter: 0,
};

const regionMapReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    // case actions.SET_MESSAGING_TOKEN:
    // case actions.UNSET_MESSAGING_TOKEN:
    //   return { ...state, token: payload };
    // case actions.SET_MESSAGING_TOKEN_SAVED:
    //   return { ...state, tokenSaved: payload };
    default:
      return state;
  }
};

export default regionMapReducer;
