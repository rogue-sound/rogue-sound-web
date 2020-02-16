import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
/** Services */
import http from '@services/http';
import { login } from '@services/auth';
import { disableRepeat } from '@services/spotify';
/** Actions */
import { setTokenAction, logoutAction } from '@context/auth';
import { fetchMeAction } from '@context/me';
import { fetchDevicesAction, changeDeviceAction } from '@context/spotify';
import { toggleLanguage } from '@context/languageSettings';
/** Components */
import Button from '@common/Button/Button';
import Select from '@common/Select';
import { Popover, PopoverTrigger } from '@common/Popover';
import UserAvatar from '@layout/Header/UserAvatar';
import DeviceSelector from './DeviceSelector';
/** Styled components */
import {
  HeaderWrapper,
  HeaderLogo,
  HeaderActionsWrapper,
  HeaderDevices,
  HeaderLanguage,
} from './header.styled';

const Header = ({ intl }) => {
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
        {token && <DeviceSelector />}
        {!!devices.length && (
          <HeaderDevices>
            <Select
              value={activeDevice}
              label={intl.formatMessage({
                id: 'app.layout.Header.DevicesLabel',
              })}
              options={devices}
              onChange={changeDeviceHandler}
            />
          </HeaderDevices>
        )}
        <HeaderLanguage>
          <Select
            value={language}
            label={intl.formatMessage({
              id: 'app.layout.Header.LanguagesLabel',
            })}
            options={[
              {
                id: 'en',
                name: intl.formatMessage({
                  id: 'app.layout.Header.LanguageEnglishLabel',
                }),
              },
              {
                id: 'es',
                name: intl.formatMessage({
                  id: 'app.layout.Header.LanguageSpanishLabel',
                }),
              },
            ]}
            onChange={changeLanguage}
          />
        </HeaderLanguage>
        {!token && (
          <Button type="login" onClick={loginHandler}>
            {intl.formatMessage({
              id: 'app.layout.Header.LoginButton',
            })}
          </Button>
        )}
        {token && me && (
          <Popover place="bottom">
            <PopoverTrigger>
              <div>
                <UserAvatar {...me} />
              </div>
            </PopoverTrigger>
            <Button type="logout" onClick={logoutHandler}>
              {intl.formatMessage({
                id: 'app.layout.Header.LogoutButton',
              })}
            </Button>
          </Popover>
        )}
      </HeaderActionsWrapper>
    </HeaderWrapper>
  );
};

Header.propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func,
  }).isRequired,
};

export default Header;
