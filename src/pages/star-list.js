import React from 'react';
import Link from 'gatsby-link';

export default ({ data }) => {
  console.log(data);
  return (
    <div>
      <h1>A thousand stars</h1>
      <p>
        The top rows from the CSV available at{' '}
        <a href="https://github.com/astronexus/HYG-Database">
          https://github.com/astronexus/HYG-Database
        </a>
      </p>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Designation</th>
            <th>Dist (parsecs)</th>
            <th>Magnitude</th>
            <th>Constellation</th>
          </tr>
        </thead>
        <tbody>
          {data.allStarsCsv.edges.map(({ node }, index) => (
            <tr key={index}>
              <td>{node.proper}</td>
              <td>{node.bf}</td>
              <td>{node.dist}</td>
              <td>{node.absmag}</td>
              <td>{node.con}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const query = graphql`
  query StarsQuery {
    allStarsCsv(sort: { fields: [dist], order: ASC }) {
      edges {
        node {
          id
          bf
          dist
          absmag
          proper
          con
        }
      }
    }
  }
`;
