import React from 'react';
import ReactDOM from 'react-dom';

import { MAP_COORDS_EQUATORIAL, MAP_COORDS_GALACTIC } from '../consts';

const styles = {
  position: 'absolute',
  top: '10px',
  left: '10px',
  backgroundColor: 'white',
};

const MapControls = props => {
  let display = 'own';
  if (props.starDisplay !== undefined && props.starDisplay !== null && props.starDisplay !== '') {
    display = props.starDisplay.color;
  }
  return (
    <div style={styles}>
      <input
        type="checkbox"
        value={props.coordinateSystem === MAP_COORDS_GALACTIC}
        onClick={props.onToggleGridRotation}
      />
      {props.coordinateSystem}
      <br />
      <input type="checkbox" value={display === 'own'} onClick={props.onToggleStarColor} />
      {display}
    </div>
  );
};

export default MapControls;
