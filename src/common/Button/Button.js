import React from 'react';
import PropTypes from 'prop-types';
/** Styled Components */
import { PrimaryButton, GreenButton, GreyButton } from './button.styled';

const buttonMapper = {
  primary: PrimaryButton,
  login: GreenButton,
  create: GreenButton,
  logout: GreyButton,
};

const Button = ({ theme = 'primary', children, onClick, ...props }) => {
  const ButtonComponent = buttonMapper[theme];

  const handleClick = () => {
    onClick && onClick();
  };

  return (
    <ButtonComponent {...props} onClick={handleClick}>
      {children}
    </ButtonComponent>
  );
};

Button.propTypes = {
  theme: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  onClick: PropTypes.func,
};

export default Button;
