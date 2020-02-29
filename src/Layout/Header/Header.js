import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
/** Services */
import http from '@services/http';
import { login } from '@services/auth';
import { disableRepeat } from '@services/spotify';
/** Actions */
import { setTokenAction, logoutAction } from '@context/auth';
import { fetchMeAction } from '@context/me';
import { fetchDevicesAction } from '@context/spotify';
/** Components */
import Button from '@common/Button';
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
    async function disableRepeatFn() {
      await disableRepeat();
    }
    if (token) {
      http.setToken(token);
      dispatch(fetchDevicesAction());
      disableRepeatFn();
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
