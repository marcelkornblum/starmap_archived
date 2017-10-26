import React from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';
import ReactDOM from 'react-dom';

import StarOnMap from '../components/StarOnMap';

import { rotate_to_galactic, rotate_to_equatorial } from '../utils/astronomy';

let OrbitControls = require('../utils/threeOrbitControls.js')(THREE);

class Simple extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = { gridRotation: new THREE.Euler() }; //equatorial by default

    // construct the position vector here, because if we use 'new' within render,
    // React will think that things have changed when they have not.
    this.origin = new THREE.Vector3(0, 0, 0);
    this.cameraPosition = new THREE.Vector3(50, 20, 0);

    this._onAnimate = () => {
      // we will get this callback every frame
      // this.controls.update();
    };
  }

  componentDidMount() {
    this.controls = new THREE.OrbitControls(
      this.refs.camera,
      ReactDOM.findDOMNode(this.refs.react3)
    );
  }

  _renderStar = (starData, idx) => <StarOnMap key={idx} data={starData.node} />;

  _renderStars = () => this.props.data.allStarsCsv.edges.map(this._renderStar);

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
            position={this.cameraPosition}
          />
          <gridHelper
            size={30}
            colorCenterLine={0x990000}
            colorGrid={0x333333}
            position={this.origin}
            rotation={this.state.gridRotation}
          />
          {this._renderStars()}
        </scene>
      </React3>
    );
  }
}

export default Simple;

export const query = graphql`
  query RegionQuery {
    allStarsCsv(sort: { fields: [dist], order: ASC }) {
      edges {
        node {
          id
          bf
          dist
          absmag
          proper
          con
          x
          y
          z
          ci
        }
      }
    }
  }
`;
