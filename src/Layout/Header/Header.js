import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
/** Services */
import http from '@services/http';
import { login } from '@services/auth';
/** Actions */
import { setTokenAction, logoutAction } from '@context/auth';
import { fetchMeAction } from '@context/me';
import { fetchDevicesAction } from '@context/spotify';
/** Common components */
import Button from '@common/Button';
/** Utils */
import { retrieveSpotifyToken } from '@utils';
/** Components */
import DeviceSelector from './DeviceSelector';
import UserPopover from './UserPopover';
/** Styled components */
import {
  HeaderWrapper,
  HeaderLogo,
  HeaderActionsWrapper,
} from './header.styled';

const Header = () => {
  const intl = useIntl();
  const { token } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const loginHandler = () => {
    login();
  };

  const logoutHandler = () => {
    dispatch(logoutAction());
  };

  useEffect(() => {
    if (window.location.hash) {
      const _token = retrieveSpotifyToken();
      _token && dispatch(setTokenAction(_token));
    }
  }, []);

  useEffect(() => {
    if (token) {
      http.setToken(token);
      dispatch(fetchDevicesAction());
      dispatch(fetchMeAction());
    }
  }, [token]);

  return (
    <HeaderWrapper>
      <HeaderLogo>Rogue Sound</HeaderLogo>
      <HeaderActionsWrapper>
        {token && <DeviceSelector intl={intl} />}
        {!token && (
          <Button type="login" onClick={loginHandler}>
            {intl.formatMessage({
              id: 'app.layout.Header.LoginButton',
            })}
          </Button>
        )}
        {token && <UserPopover logoutHandler={logoutHandler} />}
      </HeaderActionsWrapper>
    </HeaderWrapper>
  );
};

Header.propTypes = {};

export default Header;
