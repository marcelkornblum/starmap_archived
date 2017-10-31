import React from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';

import { STAR_SHAPE_SPHERE } from '../consts';
import { colorci_to_hex } from '../utils/astronomy';

export default class StarOnMap extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.realColor = colorci_to_hex(this.props.data.ci);
    this.realSize = this.props.data.absmag / 250;

    if (
      this.props.display !== undefined &&
      this.props.display !== null &&
      this.props.display !== ''
    ) {
      this.color = this.props.display.color;
      this.size = this.props.display.size;
      this.shape = this.props.display.shape;
    } else {
      this.color = this.realColor;
      this.size = this.realSize;
      this.shape = STAR_SHAPE_SPHERE;
    }

    this.position = new THREE.Vector3(this.props.data.x, this.props.data.y, this.props.data.z);
  }

  _renderGeometry = () => {
    if (this.shape === STAR_SHAPE_SPHERE) {
      return <sphereGeometry radius={this.size / 2} />;
    }
  };

  render() {
    return (
      <mesh position={this.position}>
        {this._renderGeometry()}
        <meshBasicMaterial color={this.color} />
      </mesh>
    );
  }
}
