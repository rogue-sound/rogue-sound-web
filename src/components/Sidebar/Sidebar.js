import React from 'react';
// import PropTypes from 'prop-types';
/** Styled components */
import Queue from '@components/Queue';
import { SidebarWrapper } from './sidebar.styled';

const Sidebar = () => (
  <SidebarWrapper>
    <Queue />
  </SidebarWrapper>
);

Sidebar.propTypes = {};

export default Sidebar;
