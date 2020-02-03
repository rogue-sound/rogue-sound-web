import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
/** Actions */
import { logoutAction } from '@context/auth';
/** Styled components */
import {
  UserAvatarWrapper,
  UserAvatarImage,
  UserName,
} from './UserAvatar.styled';

const UserAvatar = ({ displayName, avatarUrl, country, clearToken }) => {
  const dispatch = useDispatch();
  const logout = () => dispatch(logoutAction());

  return (
    <UserAvatarWrapper className="nav-user" onClick={logout}>
      {displayName && (
        <UserName className="nav-user__name">{displayName}</UserName>
      )}
      {avatarUrl && (
        <UserAvatarImage
          className="nav-user__avatar"
          alt="user_avatar"
          src={avatarUrl}
        />
      )}
    </UserAvatarWrapper>
  );
};

UserAvatar.propTypes = {
  displayName: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string.isRequired,
  country: PropTypes.string,
  clearToken: PropTypes.func,
};

export default UserAvatar;
