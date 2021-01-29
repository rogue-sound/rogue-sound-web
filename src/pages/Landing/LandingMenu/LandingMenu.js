import React from 'react';
import { useIntl } from 'react-intl';
/** Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
/** Styled components */
import { Menu, MenuItemText } from './LandingMenu.styled';
/** Components */
import LandingMenuItem from './LandingMenuItem';

const LandingMenu = () => {
  const intl = useIntl();

  return (
    <Menu>
      <LandingMenuItem link="/rooms">
        <FontAwesomeIcon icon={['far', 'list-alt']} />
        <MenuItemText>
          {intl.formatMessage({
            id: 'app.pages.Landing.LandingMenu.ExploreRoomsMenuItemLabel',
          })}
        </MenuItemText>
      </LandingMenuItem>
      <LandingMenuItem link="/about">
        <FontAwesomeIcon icon="portrait" />
        <MenuItemText>
          {intl.formatMessage({
            id: 'app.pages.Landing.LandingMenu.AboutUsMenuItemLabel',
          })}
        </MenuItemText>
      </LandingMenuItem>
      <LandingMenuItem link="/faq">
        <FontAwesomeIcon icon={['far', 'question-circle']} />
        <MenuItemText>
          {intl.formatMessage({
            id: 'app.pages.Landing.LandingMenu.FAQMenuItemLabel',
          })}
        </MenuItemText>
      </LandingMenuItem>
    </Menu>
  );
};

export default LandingMenu;
