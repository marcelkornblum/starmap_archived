import React from 'react';
import { connect } from 'react-redux';

import StarMap from '../components/StarMap';
import {
  selectGridRotation,
  selectCameraPosition,
  selectOrigin,
  selectCoordinateSystem,
  selectRenderCounter,
} from '../store/regionMap/selectors';
import { setStarData } from '../store/stars/actions';
import { selectRegionStarIds, selectRegionStars } from '../store/stars/selectors';

const mapStateToProps = (state, ownProps) => {
  return {
    gridRotation: selectGridRotation(state),
    coordinateSystem: selectCoordinateSystem(state),
    cameraPostion: selectCameraPosition(state),
    origin: selectOrigin(state),
    gatsbyStars: ownProps.stars.map(i => i.node), // workaround for gatsby magic graphQL
    // stars: ownProps.stars.map(i => i.node),
    // starIds: selectRegionStarIds(state),
    stars: selectRegionStars(state),
    renderCounter: selectRenderCounter(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetStarData: data => dispatch(setStarData(data)),
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return Object.assign({}, ownProps, stateProps, dispatchProps);
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(StarMap);
