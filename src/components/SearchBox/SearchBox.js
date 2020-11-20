import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
/** Hooks */
import useDebounce from '@hooks/useDebounce';
/** Common components */
import Input from '@common/Input';
/** Styles */
import './SearchBox.scss';

const SearchBox = ({
  name,
  defaultValue = '',
  placeholder,
  debounce = 500,
  onChange,
}) => {
  const [query, setQuery] = useState(defaultValue);
  const debouncedQuery = useDebounce(query, debounce);

  useEffect(() => {
    onChange && onChange(debouncedQuery);
  }, [debouncedQuery]);

  const handleChangeQuery = ({ target: { value } }) => {
    setQuery(value);
  };

  return (
    <div className="searchbox__container">
      <FontAwesomeIcon icon="search" className="searchbox__icon" />
      <Input
        className="searchbox__input"
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={handleChangeQuery}
        padding="0.375rem 0"
      />
    </div>
  );
};

SearchBox.propTypes = {
  name: PropTypes.string,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
  debounce: PropTypes.number,
  onChange: PropTypes.func,
};

export default SearchBox;
