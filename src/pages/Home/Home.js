import React from 'react';
import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
/** Components */
import Layout from '@layout';
import SearchSongs from './SearchSongs';
import Play from './Play';
/** Styled Component */
import { Component } from './home.styled';
/** Styles */
import './Home.scss';

const Home = () => {
  const intl = useIntl();
  const { token } = useSelector(state => state.auth);
  return (
    <Layout>
      <Component>
        {token ? (
          <>
            <SearchSongs intl={intl} />
            <Play intl={intl} />
          </>
        ) : (
          <p className="home-not-logged-in">
            {intl.formatMessage({
              id: 'app.pages.Home.NotLoggedInText',
            })}
          </p>
        )}
      </Component>
    </Layout>
  );
};

Home.propTypes = {};

export default Home;
