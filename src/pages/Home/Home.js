import React from 'react';
// import PropTypes from 'prop-types';

import SearchSongs from '@components/SearchSongs';
import Play from '@components//Play';
/** Styled Component */
import { Component } from './home.styled';

const Home = () => (
  <Component>
    <SearchSongs />
    <Play />
  </Component>
);

// Home.propTypes = {
// };

export default Home;
