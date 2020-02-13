import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
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
import UserAvatar from './UserAvatar';
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
        {!!devices.length && (
          <HeaderDevices>
            <Select
              value={activeDevice}
              label={intl.formatMessage({
                id: 'app.Layout.Header.DevicesLabel',
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
              id: 'app.Layout.Header.LanguagesLabel',
            })}
            options={[
              {
                id: 'en',
                name: intl.formatMessage({
                  id: 'app.Layout.Header.LanguageEnglishLabel',
                }),
              },
              {
                id: 'es',
                name: intl.formatMessage({
                  id: 'app.Layout.Header.LanguageSpanishLabel',
                }),
              },
            ]}
            onChange={changeLanguage}
          />
        </HeaderLanguage>
        {!token && (
          <Button
            text={intl.formatMessage({
              id: 'app.Layout.Header.LoginButton',
            })}
            type="login"
            onClick={() => login()}
          />
        )}
        {token && me && <UserAvatar {...me} />}
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
