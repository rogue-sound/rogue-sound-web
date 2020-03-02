import React from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Popover, PopoverTrigger } from '@common/Popover';
import Button from '@common/Button';
import UserAvatar from '../UserAvatar';
import LanguageSelector from './LanguageSelector';

const UserPopover = ({ logoutHandler }) => {
  const intl = useIntl();
  const me = useSelector(state => state.me);

  return (
    <Popover place="bottom">
      <PopoverTrigger>
        <div>
          <UserAvatar {...me} />
        </div>
      </PopoverTrigger>
      <div>
        <LanguageSelector />
        <Button type="logout" onClick={logoutHandler}>
          {intl.formatMessage({
            id: 'app.layout.Header.LogoutButton',
          })}
        </Button>
      </div>
    </Popover>
  );
};

UserPopover.propTypes = {
  logoutHandler: PropTypes.func,
};

export default UserPopover;
