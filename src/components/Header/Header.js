import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import PropTypes from 'prop-types';
/** Services */
import http from '@services/http';
import { login } from '@services/auth';
import { disableRepeat } from '@services/spotify';
/** Actions */
import { setTokenAction } from '@context/auth';
import { fetchMeAction } from '@context/me';
import { fetchDevicesAction, changeDeviceAction } from '@context/spotify';
import { toggleLanguage } from '@context/languageSettings';
/** Components */
import Button from '@common/Button/Button';
import Select from '@common/Select';
import UserAvatar from '@components/UserAvatar';
/** Styled components */
import {
  HeaderWrapper,
  HeaderLogo,
  HeaderActionsWrapper,
  HeaderDevices,
  HeaderLanguage,
} from './header.styled';

const Header = () => {
  const {
    me,
    auth: { token },
    spotify: { devices, activeDevice },
    languageSettings: { language },
  } = useSelector(state => state);

  const dispatch = useDispatch();

  const changeDeviceHandler = ({ currentTarget: { value } }) => {
    dispatch(changeDeviceAction(value));
  };

  const changeLanguage = ({ currentTarget: { value } }) => {
    dispatch(toggleLanguage(value));
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
      localStorage.setItem('token', token);
      dispatch(fetchDevicesAction());
      disableRepeatFn();
      dispatch(fetchMeAction());
    }
  }, [token]);

  return (
    <HeaderWrapper>
      <HeaderLogo>Rogue Sound</HeaderLogo>
      <HeaderActionsWrapper>
        {!!devices.length && (
          <HeaderDevices>
            <Select
              value={activeDevice}
              label="Devices"
              options={devices}
              onChange={changeDeviceHandler}
            />
          </HeaderDevices>
        )}
        <HeaderLanguage>
          <Select
            value={language}
            label="Languages"
            options={[
              { id: 'en', name: 'English' },
              { id: 'es', name: 'Spanish' },
            ]}
            onChange={changeLanguage}
          />
        </HeaderLanguage>
        {!token && (
          <Button
            text="Login to Spotify"
            type="login"
            onClick={() => login()}
          />
        )}
        {token && me && <UserAvatar {...me} />}
      </HeaderActionsWrapper>
    </HeaderWrapper>
  );
};

Header.propTypes = {};

export default Header;
