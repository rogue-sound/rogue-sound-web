import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
/** Config */
import { routes } from './config';

export const Routes = () => (
  <Switch>
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
    <Route component={() => <Redirect to="/" />} />
  </Switch>
);

Routes.propTypes = {};
