import { defaultStarDisplay } from './reducer';

export const selectGridRotation = state => state.regionMap.gridRotation;
export const selectCoordinateSystem = state => state.regionMap.coordinateSystem;
export const selectOrigin = state => state.regionMap.origin;
export const selectCameraPosition = state => state.regionMap.cameraPosition;
export const selectStarDisplay = state => state.regionMap.starDisplay;
export const selectDefaultStarDisplay = state => defaultStarDisplay;
export const selectRenderCounter = state => state.regionMap.renderCounter;
