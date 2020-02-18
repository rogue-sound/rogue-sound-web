import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
/** Actions */
import { fetchDevicesAction, changeDeviceAction } from '@context/spotify';
/** Components */
import { Popover, PopoverTrigger } from '@common/Popover';
import { ReactComponent as DevicesIcon } from '@assets/svg/devices.svg';
import DeviceSelectorItem from './DeviceSelectorItem';
/** Styled components */
import {
  DevicesSelectorWrapper,
  DevicesSelectorItemsWrapper,
  NoDevicesFoundText,
} from './DeviceSelector.styled';

const DeviceSelector = ({ intl }) => {
  const [forceClose, setForceClose] = useState(false);

  const {
    spotify: { devices, activeDevice },
    playing: { current },
  } = useSelector(state => state);

  const dispatch = useDispatch();

  useEffect(() => {
    activeDevice && dispatch(fetchDevicesAction());
  }, [activeDevice]);

  const changeDeviceHandler = deviceId => {
    dispatch(changeDeviceAction(deviceId, current));
    setForceClose(true);
  };

  const openSelectorHandler = () => {
    dispatch(fetchDevicesAction());
  };

  const closeSelectorHandler = () => {
    setForceClose(false);
  };

  const hasActiveDevice = () => {
    return !!devices.find(device => device.is_active);
  };

  const renderDevices = () => {
    if (!devices.length)
      return (
        <NoDevicesFoundText>
          {intl.formatMessage({
            id: 'app.layout.Header.DeviceSelector.NotDevicesFoundText',
          })}
        </NoDevicesFoundText>
      );
    return (
      <DevicesSelectorItemsWrapper>
        {devices.map(device => (
          <DeviceSelectorItem
            key={device.id}
            name={device.name}
            type={device.type}
            active={device.is_active}
            onSelect={() => changeDeviceHandler(device.id)}
          />
        ))}
      </DevicesSelectorItemsWrapper>
    );
  };

  return (
    <Popover
      place="bottom"
      handleIsClosed={closeSelectorHandler}
      forceClose={forceClose}
    >
      <PopoverTrigger>
        <div>
          <DevicesSelectorWrapper
            isActive={hasActiveDevice()}
            onClick={() => openSelectorHandler()}
          >
            <DevicesIcon />
          </DevicesSelectorWrapper>
        </div>
      </PopoverTrigger>
      <div>{renderDevices()}</div>
    </Popover>
  );
};

DeviceSelector.propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func,
  }).isRequired,
};

export default DeviceSelector;
