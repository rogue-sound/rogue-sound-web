import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
/** Components */
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
/** Styled components */
import { Component, ContainerWrapper } from './layout.styled';

const Layout = ({ children, intl }) => (
  <Component>
    <Header intl={intl} />
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
  intl: PropTypes.shape({
    formatMessage: PropTypes.func,
  }).isRequired,
};

export default injectIntl(Layout);
