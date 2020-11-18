import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
/** Hooks */
import useClickOutside from '@hooks/useClickOutside';
/** Styles */
import './Dropdown.scss';

const DropdownEmpty = () => <span>There is no option to display</span>;

const Dropdown = ({
  options,
  textProperty = 'name',
  valueProperty = 'id',
  defaultValue = '',
  onChange,
  placeholder = 'Select an option',
}) => {
  const triggerRef = useRef(null);
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useClickOutside(dropdownRef, false);
  const [value, setValue] = useState(defaultValue || '');
  const [dropdownWidth, setDropdownWidth] = useState(0);

  useEffect(() => {
    if (triggerRef.current) {
      const triggerElementWidth = triggerRef.current.offsetWidth;
      setDropdownWidth(triggerElementWidth);
    }
  });

  const handleTriggerClick = () => {
    setIsActive(isActiveState => !isActiveState);
  };

  const handleOptionChange = option => {
    setIsActive(isActiveState => !isActiveState);

    if (value === option[valueProperty]) return;

    setValue(option[valueProperty]);
    onChange && onChange(option[valueProperty]);
  };

  const renderSelectedOption = () => {
    // If there are no options or there isn't a selected value yet, display placeholder
    if (!options.length || !value)
      return <div className="dropdown__placeholder">{placeholder}</div>;

    const selectedOption = options.find(
      option => option[valueProperty] === value
    );

    if (!selectedOption) return <div />;

    return (
      <div className="dropdown__value">{selectedOption[textProperty]}</div>
    );
  };

  return (
    <div className="dropdown__container">
      <div
        ref={triggerRef}
        onClick={handleTriggerClick}
        className="dropdown__trigger"
      >
        {renderSelectedOption()}
        <FontAwesomeIcon
          icon="angle-down"
          className={`dropdown__caret ${
            isActive ? 'dropdown__caret--visible' : ''
          }`}
        />
      </div>
      {isActive && (
        <div
          ref={dropdownRef}
          className="dropdown__options-wrapper"
          style={dropdownWidth ? { width: `${dropdownWidth}px` } : undefined}
        >
          {options.length ? (
            <ul className="dropdown__options">
              {options.map(option => (
                <li
                  key={option[valueProperty]}
                  className={`dropdown__option ${
                    option[valueProperty] === value
                      ? 'dropdown__option--active'
                      : ''
                  }`}
                  onClick={() => handleOptionChange(option)}
                >
                  {option[textProperty]}
                </li>
              ))}
            </ul>
          ) : (
            <DropdownEmpty />
          )}
        </div>
      )}
    </div>
  );
};

Dropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object),
  textProperty: PropTypes.string,
  valueProperty: PropTypes.string,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
};

export default Dropdown;
