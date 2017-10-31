import React from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';
import ReactDOM from 'react-dom';

import StarOnMap from '../components/StarOnMap';

import { rotate_to_galactic, rotate_to_equatorial } from '../utils/astronomy';

let OrbitControls = require('../utils/threeOrbitControls.js')(THREE);

class StarMap extends React.Component {
  constructor(props, context) {
    super(props, context);

    this._onAnimate = () => {
      // we will get this callback every frame
    };
  }

  componentDidMount() {
    this.controls = new THREE.OrbitControls(
      this.refs.camera,
      ReactDOM.findDOMNode(this.refs.react3)
    );
  }

  _renderStar = (starData, idx) => <StarOnMap key={idx} data={starData} />;

  _renderStars = () => this.props.stars.map(this._renderStar);

  render() {
    const width = 700; //window.innerWidth; // canvas width
    const height = 700; // window.innerHeight; // canvas height

    return (
      <React3
        mainCamera="camera"
        width={width}
        height={height}
        ref="react3"
        antialias
        onAnimate={this._onAnimate}
      >
        <scene>
          <perspectiveCamera
            ref="camera"
            name="camera"
            fov={45}
            aspect={width / height}
            near={1}
            far={500}
            position={this.props.cameraPosition}
          />
          <gridHelper
            size={30}
            colorCenterLine={0x990000}
            colorGrid={0x333333}
            position={this.props.origin}
            rotation={this.props.gridRotation}
          />
          {this._renderStars()}
        </scene>
      </React3>
    );
  }
}

export default StarMap;
