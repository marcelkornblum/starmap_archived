import React from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';

import { colorci_to_hex } from '../utils/astronomy';

export default class StarOnMap extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      color: colorci_to_hex(this.props.data.ci),
    }; //a version of the star's color index

    this.position = new THREE.Vector3(this.props.data.x, this.props.data.y, this.props.data.z);
  }

  render() {
    return (
      <mesh position={this.position}>
        <sphereGeometry radius={this.props.data.absmag / 500} />
        <meshBasicMaterial color={this.state.color} />
      </mesh>
    );
  }
}
