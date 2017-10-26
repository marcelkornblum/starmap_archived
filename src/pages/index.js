import React from 'react';
import Link from 'gatsby-link';

const IndexPage = () => (
  <div>
    <h1>Hi people</h1>
    <p>
      <Link to="/star-list/">Go to the list of stars</Link>
    </p>
    <p>
      <Link to="/region/">Or check out the map</Link>
    </p>

    <button id="increment">INCREMENT</button>
    <button id="decrement">DECREMENT</button>
    <div id="content" />
  </div>
);

export default IndexPage;
