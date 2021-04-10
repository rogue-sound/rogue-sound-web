import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
/** Styled components */
import {
  InputContainer,
  InputElement,
  InputLabel,
  InputErrorMessage,
} from './Input.styled';

const Input = forwardRef(({ name, label, className, error, ...props }, ref) => (
  <InputContainer className={className}>
    {label && <InputLabel htmlFor={name}>{label}</InputLabel>}
    <InputElement
      {...props}
      id={name}
      name={name}
      ref={ref}
      className={error ? 'input__error' : ''}
    />
    {error && error.message && (
      <InputErrorMessage>{error.message}</InputErrorMessage>
    )}
  </InputContainer>
));

Input.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
};

export default Input;
