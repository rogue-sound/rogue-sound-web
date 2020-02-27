import React from 'react';
/** Components */
import Queue from './Queue';
/** Styled components */
import { SidebarWrapper } from './sidebar.styled';

const Sidebar = () => (
  <SidebarWrapper>
    <Queue />
  </SidebarWrapper>
);

Sidebar.propTypes = {};

export default Sidebar;
