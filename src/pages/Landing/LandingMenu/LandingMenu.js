import React from 'react';
/** Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
/** Styled components */
import { Menu, MenuItemText } from './LandingMenu.styled';
/** Components */
import LandingMenuItem from './LandingMenuItem';

const LandingMenu = () => (
  <Menu>
    <LandingMenuItem link="/rooms">
      <FontAwesomeIcon icon={['far', 'list-alt']} />
      <MenuItemText>Explore rooms</MenuItemText>
    </LandingMenuItem>
    <LandingMenuItem link="/about">
      <FontAwesomeIcon icon="portrait" />
      <MenuItemText>About us</MenuItemText>
    </LandingMenuItem>
    <LandingMenuItem link="/faq">
      <FontAwesomeIcon icon={['far', 'question-circle']} />
      <MenuItemText>FAQ</MenuItemText>
    </LandingMenuItem>
  </Menu>
);

export default LandingMenu;
