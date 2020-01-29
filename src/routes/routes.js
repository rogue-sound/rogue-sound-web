import * as React from 'react';
/** Libraries */
import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
/** Config */
import { fakeAuth } from '@utils/fakeAuth';
import Login from '@containers/Login';
import Layout from '@containers/Layout';
import { routes } from './config';

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
const PrivateRoute = ({ path, exact, Page }) => (
  <Route
    path={path}
    exact={exact}
    render={props =>
      fakeAuth().isAuthenticated ? (
        <Page {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
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

export const Routes = () => (
  <Switch>
    <Route key="login-route" path="/login" exact={false} component={Login} />
    <Layout>
      {routes &&
        Array.isArray(routes) &&
        routes.map(route => (
          <Route
            key={route.id}
            path={route.path}
            exact={route.exact}
            component={route.component}
          />
        ))}
    </Layout>
    {/* {
           <PrivateRoute
          // route={route}
          key={index}
          path={route.path}
          exact={route.exact}
          Page={route.component}
        />;
        } */}
  </Switch>
);
