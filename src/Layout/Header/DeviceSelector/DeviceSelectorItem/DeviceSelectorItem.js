import React from 'react';
import PropTypes from 'prop-types';
/** Components */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactComponent as ComputerIcon } from '@assets/svg/laptop.svg';
import { ReactComponent as SpeakerIcon } from '@assets/svg/speaker.svg';
/** Styled components */
import {
  DeviceSelectorItemWrapper,
  DeviceSelectorItemIcon,
  DeviceSelectorItemText,
} from './DeviceSelectorItem.styled';

const DeviceSelectorItem = ({ name, type, active, onSelect }) => {
  const renderDeviceIcon = () => {
    switch (type) {
      case 'Computer':
        return <ComputerIcon />;
      case 'Smartphone':
        return (
          <FontAwesomeIcon
            icon="mobile-alt"
            style={{ width: '20px', height: '20px' }}
          />
        );
      case 'Speaker':
        return <SpeakerIcon />;
      default:
        return null;
    }
  };

  return (
    <DeviceSelectorItemWrapper onClick={onSelect}>
      <DeviceSelectorItemIcon isActive={active}>
        {renderDeviceIcon()}
      </DeviceSelectorItemIcon>
      <DeviceSelectorItemText>{name}</DeviceSelectorItemText>
    </DeviceSelectorItemWrapper>
  );
};

DeviceSelectorItem.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  active: PropTypes.bool,
  onSelect: PropTypes.func,
};

export default DeviceSelectorItem;
