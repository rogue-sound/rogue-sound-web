import * as React from 'react';
/** Libraries */
import PropTypes from 'prop-types';
/** Styled Component */
import { Component } from './layout.styled';

const Layout = ({ children }) => (
  <Component>
    LAYOUT
    {children}
    MAS LAYOUT
  </Component>
);

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Layout;
