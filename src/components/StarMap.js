import React from 'react';
import ReactDOM from 'react-dom';
import React3 from 'react-three-renderer';
import * as THREE from 'three';

import Star from '../containers/Star';
// import Star from '../components/Star';

import { rotate_to_galactic, rotate_to_equatorial } from '../utils/astronomy';

// let OrbitControls = require('../utils/threeOrbitControls.js')(THREE);
let TrackballControls = require('../utils/threeTrackballControls.js')(THREE);

class StarMap extends React.Component {
  constructor(props, context) {
    super(props, context);

    // this.renderCounter = this.props.renderCounter;

    this._onAnimate = () => {
      // we will get this callback every frame
      // if (this.renderCounter !== this.props.renderCounter) {
      //   this.renderCounter = this.props.renderCounter;
      //   this.render();
      // }
      // this.render();
      // this.controls.update();
    };
  }

  componentWillMount() {
    // workaround for gatsby magic graphQL
    this.props.onSetStarData(this.props.gatsbyStars);
  }

  componentDidMount() {
    this.controls = new THREE.TrackballControls(
      this.refs.camera,
      ReactDOM.findDOMNode(this.refs.react3)
    );
  }

  // shouldComponentUpdate() {
  //   console.log('should update');
  //   this.controls = new THREE.OrbitControls(
  //     this.refs.camera,
  //     ReactDOM.findDOMNode(this.refs.react3)
  //   );
  //   return true;
  // }

  // componentDidUpdate() {
  //   this.controls = new THREE.OrbitControls(
  //     this.refs.camera,
  //     ReactDOM.findDOMNode(this.refs.react3)
  //   );
  //   console.log('did update', this.controls);
  // }

  _renderStars = () =>
    // this.props.starIds.map((starId, idx) => (
    this.props.stars.map((starData, idx) => (
      // react-render-three needs a hand to nest React Components within the <scene />;
      // hence passing store through props
      // <Star key={idx} id={starId} store={this._reactInternalInstance._context.store} />

      <Star key={idx} data={starData} store={this._reactInternalInstance._context.store} />
    ));

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
            rotation={this.props.gridRotation}
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
