import React from 'react';
import { connect } from 'react-redux';
import Link from 'gatsby-link';

import { selectCounter } from '../store/regionMap/selectors';
import { increment, decrement } from '../store/regionMap/actions';

const mapStateToProps = state => {
  return {
    counter: selectCounter(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIncrement: () => dispatch(increment()),
  };
};

class IndexPage extends React.Component {
  render = () => {
    console.log(this);
    return (
      <div>
        <h1>Hi people</h1>
        <p>
          <Link to="/star-list/">Go to the list of stars</Link>
        </p>
        <p>
          <Link to="/region/">Or check out the map</Link>
        </p>

        <button id="increment" onClick={this.props.onIncrement}>
          INCREMENT
        </button>
        <button id="decrement">DECREMENT</button>
        <div id="content">{this.props.counter}</div>
      </div>
    );
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);
