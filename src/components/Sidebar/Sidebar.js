import React from 'react';
import PropTypes from 'prop-types';
/** Styled components */
import Queue from '@components/Queue';
import { SidebarWrapper } from './sidebar.styled';

const Sidebar = ({ intl }) => (
  <SidebarWrapper>
    <Queue intl={intl} />
  </SidebarWrapper>
);

Sidebar.propTypes = {
  intl: PropTypes.shape({}).isRequired,
};

export default Sidebar;
