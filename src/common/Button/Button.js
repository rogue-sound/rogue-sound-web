import React from 'react';
import PropTypes from 'prop-types';
/** Styled Components */
import { PrimaryButton, LoginButton, LogoutButton } from './Button.styled';

const buttonMapper = {
  primary: PrimaryButton,
  login: LoginButton,
  logout: LogoutButton,
};

const Button = ({ type = 'primary', children, onClick, ...props }) => {
  const ButtonComponent = buttonMapper[type];
  return (
    <ButtonComponent {...props} onClick={() => onClick()}>
      {children}
    </ButtonComponent>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  onClick: PropTypes.func,
};

export default Button;
