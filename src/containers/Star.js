import React from 'react';
import { connect } from 'react-redux';

import Star from '../components/Star';
import { triggerReRender } from '../store/regionMap/actions';
import { selectStarDisplay, selectDefaultStarDisplay } from '../store/regionMap/selectors';
import { selectStarById } from '../store/stars/selectors';

const mapStateToProps = (state, ownProps) => {
  return {
    display: selectStarDisplay(state),
    defaultDisplay: selectDefaultStarDisplay(state),
    // data: selectStarById(state, ownProps.id),
    data: ownProps.data,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTriggerReRender: data => dispatch(triggerReRender()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Star);
