import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import PropTypes from 'prop-types';
/** Services */
import http from '@services/http';
import { login } from '@services/auth';
/** Actions */
import { setTokenAction } from '@context/auth';
import { fetchMeAction } from '@context/me';
/** Components */
import Button from '@common/Button/Button';
import UserAvatar from '@components/UserAvatar';
/** Styled components */
import { HeaderWrapper, HeaderLogo } from './header.styled';

const Header = () => {
  const {
    me,
    auth: { token },
  } = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      http.setToken(token);
    } else {
      const hash = window.location.hash
        .substring(1)
        .split('&')
        .reduce((initial, item) => {
          if (item) {
            const parts = item.split('=');
            initial[parts[0]] = decodeURIComponent(parts[1]);
          }
          return initial;
        }, {});

      const _token = hash.access_token;

      window.location.hash = '';

      _token && dispatch(setTokenAction(_token));
    }
  }, []);

  useEffect(() => {
    if (token) {
      http.setToken(token);
      localStorage.setItem('token', token);
      dispatch(fetchMeAction());
    }
  }, [token]);

  return (
    <HeaderWrapper>
      <HeaderLogo>Rogue Sound</HeaderLogo>
      {!token && (
        <Button text="Login to Spotify" type="login" onClick={() => login()} />
      )}
      {token && me && <UserAvatar {...me} />}
    </HeaderWrapper>
  );
};

Header.propTypes = {};

export default Header;
