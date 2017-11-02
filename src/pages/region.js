import React from 'react';

import MapControls from '../containers/MapControls';
import StarMap from '../containers/StarMap';

const Region = props => (
  <div>
    <StarMap stars={props.data.allStarsCsv.edges} />
    <MapControls />
  </div>
);

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

export default Region;
