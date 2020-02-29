import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
/** Actions */
import {
  fetchDevicesAction,
  setCurrentDevice,
  setIsActive,
} from '@context/spotify';
/** Components */
import { Popover, PopoverTrigger } from '@common/Popover';
import { ReactComponent as DevicesIcon } from '@assets/svg/devices.svg';
import { changeDevice, disableRepeat } from '@services/spotify';
import DeviceSelectorItem from './DeviceSelectorItem';
/** Styled components */
import {
  DevicesSelectorWrapper,
  DevicesSelectorItemsWrapper,
  NoDevicesFoundText,
} from './DeviceSelector.styled';

const DeviceSelector = () => {
  const intl = useIntl();
  const [forceClose, setForceClose] = useState(false);

  const { devices, activeDevice, isActive } = useSelector(
    state => state.spotify
  );

  const dispatch = useDispatch();

  useEffect(() => {
    async function deviceSetUp() {
      if (!isActive) {
        await changeDevice(activeDevice, false);
        dispatch(setIsActive(true));
      }
      setTimeout(() => disableRepeat(activeDevice), 250);
    }
    activeDevice && deviceSetUp();
  }, [activeDevice]);

  const changeDeviceHandler = device => {
    dispatch(
      setCurrentDevice({ activeDevice: device.id, isActive: device.is_active })
    );
    setForceClose(true);
  };

  const openSelectorHandler = () => {
    dispatch(fetchDevicesAction());
  };

  const closeSelectorHandler = () => {
    setForceClose(false);
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
            onSelect={() => changeDeviceHandler(device)}
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
            isActive={activeDevice}
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
