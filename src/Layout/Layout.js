import React from 'react';
import PropTypes from 'prop-types';
/** Components */
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
/** Styled components */
import { Component, ContainerWrapper } from './layout.styled';

const Layout = ({ children }) => (
  <Component>
    <Header />
    <ContainerWrapper>
      {children}
      <Sidebar />
    </ContainerWrapper>
    <Footer />
  </Component>
);

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Layout;
