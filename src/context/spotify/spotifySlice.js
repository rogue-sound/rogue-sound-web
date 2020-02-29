import { createSlice } from '@reduxjs/toolkit';
import { getDevices } from '@services/spotify';
import { noop } from '@utils';

const initialState = {
  devices: [],
  activeDevice: '',
  isActive: false,
};

const spotifySlice = createSlice({
  name: 'spotify',
  initialState,
  reducers: {
    setDevices: (state, action) => ({
      ...state,
      devices: action.payload,
    }),
    setCurrentDevice: (state, action) => {
      state.activeDevice = action.payload.activeDevice;
      state.isActive = action.payload.isActive;
    },
    resetDevices: state => ({
      ...state,
      devices: [],
      activeDevice: '',
    }),
    setIsActive: (state, action) => {
      state.isActive = action.payload;
    },
  },
});

export const {
  setDevices,
  setCurrentDevice,
  resetDevices,
  setIsActive,
} = spotifySlice.actions;

export default spotifySlice.reducer;

export const fetchDevicesAction = () => async dispatch => {
  const devices = await getDevices().catch(noop);
  if (devices) {
    dispatch(setDevices(devices));
    const activeDevice = devices.find(device => device.is_active);
    activeDevice &&
      dispatch(
        setCurrentDevice({
          activeDevice: activeDevice.id,
          isActive: activeDevice.is_active,
        })
      );
  }
};
