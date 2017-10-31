import React from 'react';

import StarMap from '../containers/StarMap';

const Region = props => <StarMap stars={props.data.allStarsCsv.edges} />;

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
