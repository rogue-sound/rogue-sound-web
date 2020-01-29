import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import PropTypes from 'prop-types';
/** Config */
import Login from '@pages/Login';
import Layout from '@pages/Layout';
import { routes } from './config';
/** Components */
// import { PrivateRoute } from './PrivateRoute/PrivateRoute';

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

Routes.propTypes = {};
