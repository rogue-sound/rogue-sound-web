import React from 'react';
import PropTypes from 'prop-types';

/** Styled components */
import {
  UserAvatarWrapper,
  UserAvatarImage,
  UserName,
} from './UserAvatar.styled';

const UserAvatar = ({ displayName, avatarUrl, country, clearToken }) => {
  return (
    <UserAvatarWrapper className="nav-user">
      {avatarUrl && (
        <UserAvatarImage
          className="nav-user__avatar"
          alt="user_avatar"
          src={avatarUrl}
        />
      )}
      {displayName && (
        <UserName className="nav-user__name">{displayName}</UserName>
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
