import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import SearchSongs from '@components/SearchSongs';
import Play from '@components//Play';
/** Styled Component */
import { Component } from './home.styled';
import './Home.scss';

const Home = ({ intl }) => {
  const { token } = useSelector(state => state.auth);
  return (
    <Component>
      {token ? (
        <>
          <SearchSongs intl={intl} />
          <Play />
        </>
      ) : (
        <p className="home-not-logged-in">You are not logged in</p>
      )}
    </Component>
  );
};

Home.propTypes = {
  intl: PropTypes.shape({}).isRequired,
};

export default injectIntl(Home);
