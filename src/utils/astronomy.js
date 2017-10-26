// NB All star data originally from https://github.com/astronexus/HYG-Database
// Coordinate system used there is Earth Equatorial at epoch 2000 (which is most commonly used in the field)
// The HYG data set has Z as the equatorial north pole, X as vernal equinox and Y as 6 hours RA, 0 Dec
// Both spherical (RA/DEC) and rectangular (Y/Y/Z) data are available in the source

import * as THREE from 'three';

// Galactic North is at RA = 12h51m26.282s, Dec = +27°07'42"01 (192.859508, 27.128336 in decimal degrees; 3.36603341, 0.473478784 in radians)
// Galactic Centre at RA = 17h45m37.224s, Dec = -28°56'10"23  (266.405100, -28.936175 in decimal degrees; 4.64964614, -0.505031527 in radians)
export const EQ_TO_GAL_OFFSETS = {
  x: 0.473478784,
  y: 0,
  z: 3.36603341,
};
export const PA_TO_LY_MULT = 3.262;

export const parsecs_to_lightyears = dist => dist * PA_TO_LY_MULT;

export const lightyears_to_parsecs = dist => dist / PA_TO_LY_MULT;

/*
 * conversion between coordinate systems
 * NB all we are doing is rotating the reference grid, which is based on a vector-defined origin point
 */

// all angles in radians
export const rotate_to_galactic = () =>
  new THREE.Euler(
    Math.PI / 2 - EQ_TO_GAL_OFFSETS.x,
    EQ_TO_GAL_OFFSETS.y,
    2 * Math.PI - EQ_TO_GAL_OFFSETS.z,
    'XYZ'
  );

export const rotate_to_equatorial = () =>
  new THREE.Euler(EQ_TO_GAL_OFFSETS.x, EQ_TO_GAL_OFFSETS.y, EQ_TO_GAL_OFFSETS.z, 'XYZ');

export const colorci_to_hex = ci => {
  let cS = [
    '0xadd8e6',
    '0xb7dde8',
    '0xc1e1e8',
    '0xcbe4e6',
    '0xd4e7e2',
    '0xdceadd',
    '0xe3ebd6',
    '0xeaeccd',
    '0xf0ecc4',
    '0xf6ebb9',
    '0xfae9ad',
    '0xffe6a1',
    '0xffe294',
    '0xffdd86',
    '0xffd778',
    '0xffcf6a',
    '0xffc65b',
    '0xffbc4c',
    '0xffaf3e',
    '0xffa130',
    '0xff9121',
    '0xff7d13',
    '0xff6605',
    '0xff4700',
    '0xff0000',
  ];
  // from https://vis4.net/labs/multihue/0xcolors=lightblue, white, yellow, red|steps=25|bez=1|coL=0
  // ci === 0 is -0.5, ci = 5 is 0.0, ci = 24 = 1.9
  if (typeof ci === undefined || ci === null || ci === '') {
    return 0xffffff;
  }
  let bmv = parseFloat(ci);
  let idx = Math.round((bmv + 0.5) * 10);
  if (idx < 0) {
    idx = 0;
  }
  if (idx >= cS.length) {
    idx = cS.length - 1;
  }
  return parseInt(cS[idx], 16);
};
