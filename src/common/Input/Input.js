import React from 'react';
import PropTypes from 'prop-types';

import { InputContainer, InputElement, InputLabel } from './Input.styled';

const Input = ({
  name, label, className, ...props
}) => (
  <InputContainer className={className}>
    {label && <InputLabel htmlFor={name}>{label}</InputLabel>}
    <InputElement {...props} id={name} name={name} />
  </InputContainer>
);

Input.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
};

export default Input;
