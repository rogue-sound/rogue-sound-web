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
    spotify: { devices, activeDevice },
    playing: { current },
  } = useSelector(state => state);

  const dispatch = useDispatch();

  const changeDeviceHandler = deviceId => {
    dispatch(changeDeviceAction(deviceId, current));
  };

  const fetchDevicesHandler = () => {
    dispatch(fetchDevicesAction());
  };

  return (
    <Popover place="bottom">
      <PopoverTrigger>
        <div>
          <DevicesSelectorWrapper
            isActive={devices && devices.length && activeDevice}
            onClick={() => fetchDevicesHandler()}
          >
            <DevicesIcon />
          </DevicesSelectorWrapper>
        </div>
      </PopoverTrigger>
      <div>
        {!devices.length && (
          <NoDevicesFoundText>No devices found</NoDevicesFoundText>
        )}
        {!!devices.length && (
          <DevicesSelectorItemsWrapper>
            {devices.map(device => (
              <DeviceSelectorItem
                key={device.id}
                name={device.name}
                onSelect={() => changeDeviceHandler(device.id)}
              />
            ))}
          </DevicesSelectorItemsWrapper>
        )}
      </div>
    </Popover>
  );
};

DeviceSelector.propTypes = {};

export default DeviceSelector;
