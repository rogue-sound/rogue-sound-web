import React from 'react';
import PropTypes from 'prop-types';

import { PrimaryButton } from './Button.styled';

const Button = ({ text, onClick }) => <PrimaryButton onClick={() => onClick()}>{text}</PrimaryButton>;

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default Button;
