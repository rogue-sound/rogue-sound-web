import { createSlice } from '@reduxjs/toolkit';
import { getDevices, changeDevice } from '@services/spotify';
import { noop } from '@utils';

const initialState = {
  devices: [],
  activeDevice: '',
};

const spotifySlice = createSlice({
  name: 'spotify',
  initialState,
  reducers: {
    setDevices: (state, action) => ({
      ...state,
      devices: action.payload,
    }),
    setCurrentDevice: (state, action) => ({
      ...state,
      activeDevice: action.payload,
    }),
    resetCurrentDevice: (state, action) => ({
      ...state,
      activeDevice: '',
    }),
  },
});

export const {
  setDevices,
  setCurrentDevice,
  resetCurrentDevice,
} = spotifySlice.actions;

export default spotifySlice.reducer;

export const fetchDevicesAction = () => async dispatch => {
  const devices = await getDevices().catch(noop);
  if (devices) {
    dispatch(setDevices(devices));
    const activeDevice = devices.find(device => device.is_active);
    if (!activeDevice) {
      if (devices.length === 1) {
        const firstDevice = devices[0].id;
        await dispatch(changeDevice(firstDevice));
        dispatch(setCurrentDevice(firstDevice));
      }
    } else {
      dispatch(setCurrentDevice(activeDevice.id));
    }
  }
};

export const changeDeviceAction = deviceId => async dispatch => {
  try {
    await changeDevice(deviceId);
    dispatch(setCurrentDevice(deviceId));
  } catch (error) {
    console.log(error);
  }
};
