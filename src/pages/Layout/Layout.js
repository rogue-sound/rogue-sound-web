import React from 'react';
import PropTypes from 'prop-types';
/** Components */
import Header from '@components/Header';
import Sidebar from '@components/Sidebar';
import Footer from '@components/Footer';
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
