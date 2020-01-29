import React from 'react';
import PropTypes from 'prop-types';
/** Styled components */
import { SelectContainer, SelectElement } from './Select.styled';

const Select = ({
  name, label, options, textProperty = 'name', valueProperty = 'id', ...props
}) => (
  <SelectContainer>
    <label htmlFor={name}>{label}</label>
    <SelectElement id={name} name={name} {...props}>
      {options.map((option) => (
        <option key={option[valueProperty]} value={option[valueProperty]}>
          {option[textProperty]}
        </option>
      ))}
    </SelectElement>
  </SelectContainer>
);

Select.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
  textProperty: PropTypes.string,
  valueProperty: PropTypes.string,
};

export default Select;
