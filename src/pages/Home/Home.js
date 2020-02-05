import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import SearchSongs from '@components/SearchSongs';
import Play from '@components//Play';
/** Styled Component */
import { Component } from './home.styled';

const Home = ({ intl }) => (
  <Component>
    <SearchSongs intl={intl} />
    <Play />
  </Component>
);

Home.propTypes = {
  intl: PropTypes.shape({}).isRequired,
};

export default injectIntl(Home);
