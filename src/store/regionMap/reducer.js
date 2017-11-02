import { handleActions } from 'redux-actions';
import * as THREE from 'three';

import { rotate_to_galactic, rotate_to_equatorial } from '../../utils/astronomy';
import { MAP_COORDS_GALACTIC, MAP_COORDS_EQUATORIAL, STAR_SHAPE_SPHERE } from '../../consts';

import * as regionMap from './actions';

export const defaultStarDisplay = {
  color: 0xffffff,
  size: 0.1,
  shape: STAR_SHAPE_SPHERE,
};

export const initialState = {
  gridRotation: new THREE.Euler(),
  coordinateSystem: MAP_COORDS_EQUATORIAL, // the source data is in this form
  origin: new THREE.Vector3(0, 0, 0),
  cameraPosition: new THREE.Vector3(50, 20, 0),
  starDisplay: defaultStarDisplay,
  renderCounter: 0,
};

export default handleActions(
  {
    [regionMap.toggleGridRotation]: (state, action) => {
      if (state.coordinateSystem === MAP_COORDS_EQUATORIAL) {
        return {
          ...state,
          gridRotation: rotate_to_galactic(),
          coordinateSystem: MAP_COORDS_GALACTIC,
        };
      } else {
        return {
          ...state,
          gridRotation: rotate_to_equatorial(),
          coordinateSystem: MAP_COORDS_EQUATORIAL,
        };
      }
    },
    [regionMap.toggleStarColor]: (state, action) => {
      console.log(state.starDisplay !== defaultStarDisplay, state.starDisplay, defaultStarDisplay);
      if (state.starDisplay !== defaultStarDisplay) {
        return {
          ...state,
          starDisplay: defaultStarDisplay,
        };
      } else {
        return {
          ...state,
          starDisplay: null,
        };
      }
    },
    [regionMap.triggerReRender]: (state, action) => ({
      ...state,
      renderCounter: state.renderCounter + 1,
    }),
  },
  initialState
);
