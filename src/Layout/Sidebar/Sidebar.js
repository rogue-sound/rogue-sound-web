import React from 'react';
import PropTypes from 'prop-types';
/** Components */
import Queue from './Queue';
/** Styled components */
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
