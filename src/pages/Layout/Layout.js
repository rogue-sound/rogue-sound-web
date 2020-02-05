import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
/** Components */
import Header from '@components/Header';
import Sidebar from '@components/Sidebar';
import Footer from '@components/Footer';
/** Styled components */
import { Component, ContainerWrapper } from './layout.styled';

const Layout = ({ children, intl }) => (
  <Component>
    <Header />
    <ContainerWrapper>
      {children}
      <Sidebar intl={intl} />
    </ContainerWrapper>
    <Footer />
  </Component>
);

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  intl: PropTypes.shape({}).isRequired,
};

export default injectIntl(Layout);
