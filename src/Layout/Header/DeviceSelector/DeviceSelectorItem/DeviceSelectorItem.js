import React from 'react';
import PropTypes from 'prop-types';
/** Styled components */
import { DeviceSelectorItemWrapper } from './DeviceSelectorItem.styled';

const DeviceSelectorItem = ({ name, onSelect }) => (
  <DeviceSelectorItemWrapper onClick={onSelect}>
    {name}
  </DeviceSelectorItemWrapper>
);

DeviceSelectorItem.propTypes = {
  name: PropTypes.string,
  onSelect: PropTypes.func,
};

export default DeviceSelectorItem;
