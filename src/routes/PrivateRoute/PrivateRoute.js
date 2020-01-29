import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
/** Config */
import { fakeAuth } from '@utils/fakeAuth';

/**
 * A wrapper for <Route> that redirects to the login
 * screen if you're not yet authenticated.
 */
const PrivateRoute = ({
  path, exact, Page,
}) => (
  <Route
    path={path}
    exact={exact}
    render={(props) => (fakeAuth().isAuthenticated ? (
      <Page {...props} />
    ) : (
      <Redirect to="/login" />
    ))}
  />
);

PrivateRoute.propTypes = {
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool.isRequired,
  Page: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.object,
  ]),
};
