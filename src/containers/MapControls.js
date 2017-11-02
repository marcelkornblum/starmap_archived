import React from 'react';
import { connect } from 'react-redux';

import MapControls from '../components/MapControls';
import { toggleGridRotation, toggleStarColor } from '../store/regionMap/actions';
import { selectCoordinateSystem, selectStarDisplay } from '../store/regionMap/selectors';

const mapStateToProps = (state, ownProps) => {
  return {
    coordinateSystem: selectCoordinateSystem(state),
    starDisplay: selectStarDisplay(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onToggleGridRotation: () => dispatch(toggleGridRotation()),
    onToggleStarColor: () => dispatch(toggleStarColor()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapControls);
