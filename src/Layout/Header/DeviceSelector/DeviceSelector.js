import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
/** Components */
import { Popover, PopoverTrigger } from '@common/Popover';
/** SVG */
import { ReactComponent as DevicesIcon } from '@assets/svg/devices.svg';
/** Styled components */
import { DevicesSelectorWrapper } from './DeviceSelector.styled';

const DeviceSelector = () => {
  const {
    spotify: { devices, activeDevice },
  } = useSelector(state => state);

  useEffect(() => {
    console.log(devices);
  }, [devices]);

  const changeDeviceHandler = deviceId => {
    // dispatch(changeDeviceAction(deviceId));
    console.log(deviceId);
  };

  return (
    <Popover place="bottom">
      <PopoverTrigger>
        <div>
          <DevicesSelectorWrapper
            isActive={devices && devices.length && activeDevice}
          >
            <DevicesIcon />
          </DevicesSelectorWrapper>
        </div>
      </PopoverTrigger>
      <div>
        {!devices.length && 'No devices found'}
        {!!devices.length &&
          devices.map(device => (
            <div
              key={device.id}
              role="button"
              tabIndex="0"
              onClick={changeDeviceHandler(device.id)}
              onKeyPress={e => {
                e.stopPropagation();
              }}
            >
              {device.name}
            </div>
          ))}
      </div>
    </Popover>
  );
};

export default DeviceSelector;
