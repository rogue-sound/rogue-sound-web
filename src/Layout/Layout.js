import React from 'react';
import PropTypes from 'prop-types';
/** Components */
import Header from './Header';
/** Styled components */
import { LayoutContainer, LayoutContent } from './layout.styled';

const Layout = ({ children }) => (
  <LayoutContainer>
    <Header />
    <LayoutContent>{children}</LayoutContent>
  </LayoutContainer>
);

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Layout;
