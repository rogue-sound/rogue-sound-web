import React from 'react';
import PropTypes from 'prop-types';
/** Styled Components */
import { PrimaryButton, LoginButton } from './Button.styled';

const buttonMapper = {
  primary: PrimaryButton,
  login: LoginButton,
};

const Button = ({ text, type = 'primary', onClick }) => {
  const ButtonComponent = buttonMapper[type];
  return <ButtonComponent onClick={() => onClick()}>{text}</ButtonComponent>;
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
