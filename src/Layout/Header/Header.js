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
import { toggleLanguage } from '@context/languageSettings';
/** Components */
import Button from '@common/Button/Button';
import Select from '@common/Select';
import { Popover, PopoverTrigger } from '@common/Popover';
import UserAvatar from '@layout/Header/UserAvatar';
import { retrieveSpotifyToken } from '@utils';
import DeviceSelector from './DeviceSelector';
/** Styled components */
import {
  HeaderWrapper,
  HeaderLogo,
  HeaderActionsWrapper,
  HeaderLanguage,
} from './header.styled';

const Header = () => {
  const intl = useIntl();
  const me = useSelector(state => state.me);
  const { token } = useSelector(state => state.auth);
  const { language } = useSelector(state => state.languageSettings);

  const dispatch = useDispatch();

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

Header.propTypes = {};

export default Header;
