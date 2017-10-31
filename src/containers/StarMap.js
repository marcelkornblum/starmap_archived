import React from 'react';
import { connect } from 'react-redux';

import StarMap from '../components/StarMap';
import { toggleGridRotation } from '../store/regionMap/actions';
import {
  selectGridRotation,
  selectCameraPosition,
  selectOrigin,
  selectCoordinateSystem,
} from '../store/regionMap/selectors';
import { setStarData } from '../store/stars/actions';
import { selectRegionStars } from '../store/stars/selectors';

const mapStateToProps = (state, ownProps) => {
  return {
    gridRotation: selectGridRotation(state),
    coordinateSystem: selectCoordinateSystem(state),
    cameraPostion: selectCameraPosition(state),
    origin: selectOrigin(state),
    gatsbyStars: ownProps.stars, // workaround for gatsby magic graphQL
    stars: selectRegionStars(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onToggleGridRotation: () => dispatch(toggleGridRotation()),
    onSetStarData: data => dispatch(setStarData(data)),
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  dispatchProps.onSetStarData(stateProps.gatsbyStars); // workaround for gatsby magic graphQL
  return Object.assign({}, ownProps, stateProps, dispatchProps);
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(StarMap);
