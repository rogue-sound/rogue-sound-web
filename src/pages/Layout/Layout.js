import React from 'react';
import PropTypes from 'prop-types';
/** Styled components */
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
