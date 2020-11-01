import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
/** Services */
import http from '@services/http';
/** Actions */
import { logoutAction } from '@context/auth';
import { fetchMeAction } from '@context/me';
import { fetchDevicesAction } from '@context/spotify';
/** Components */
import LoginButton from '@components/LoginButton';
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

  const logoutHandler = () => {
    dispatch(logoutAction());
  };

  useEffect(() => {
    if (token) {
      http.setToken(token);
      dispatch(fetchDevicesAction());
      dispatch(fetchMeAction());
    }
  }, [token]);

  return (
    <HeaderWrapper>
      <Link to="/">
        <HeaderLogo>Rogue Sound</HeaderLogo>
      </Link>
      <HeaderActionsWrapper>
        {token && <DeviceSelector intl={intl} />}
        {!token && <LoginButton />}
        {token && <UserPopover logoutHandler={logoutHandler} />}
      </HeaderActionsWrapper>
    </HeaderWrapper>
  );
};

Header.propTypes = {};

export default Header;
