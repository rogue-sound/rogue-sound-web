import React from 'react';
// import PropTypes from 'prop-types';
/** Services */
import { login } from '@services/auth';
/** Components */
import Button from '../../common/Button/Button';
/** Styled components */
import { HeaderWrapper } from './header.styled';

const Header = () => (
  <HeaderWrapper>
    <Button text="Login to Spotify" type="login" onClick={() => login()} />
  </HeaderWrapper>
);

Header.propTypes = {};

export default Header;
