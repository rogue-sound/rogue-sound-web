import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
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

const DeviceSelector = () => {
  const {
    spotify: { devices },
    playing: { current },
  } = useSelector(state => state);

  const dispatch = useDispatch();

  const changeDeviceHandler = deviceId => {
    dispatch(changeDeviceAction(deviceId, current));
  };

  const fetchDevicesHandler = () => {
    dispatch(fetchDevicesAction());
  };

  const hasActiveDevice = () => {
    return !!devices.find(device => device.is_active);
  };

  const renderDevices = () => {
    if (!devices.length)
      return <NoDevicesFoundText>No devices found</NoDevicesFoundText>;
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
    <Popover place="bottom" handleIsClosed={fetchDevicesHandler}>
      <PopoverTrigger>
        <div>
          <DevicesSelectorWrapper
            isActive={hasActiveDevice()}
            onClick={() => fetchDevicesHandler()}
          >
            <DevicesIcon />
          </DevicesSelectorWrapper>
        </div>
      </PopoverTrigger>
      <div>{renderDevices()}</div>
    </Popover>
  );
};

DeviceSelector.propTypes = {};

export default DeviceSelector;
