import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
/** Styled components */
import { MenuItemContainer, MenuItem } from './LandingMenuItem.styled';

const LandingMenuItem = ({ children, link, exact }) => (
  <MenuItemContainer>
    <NavLink to={link} exact={exact}>
      <MenuItem>{children}</MenuItem>
    </NavLink>
  </MenuItemContainer>
);

LandingMenuItem.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  link: PropTypes.string,
  exact: PropTypes.bool,
};

export default LandingMenuItem;
