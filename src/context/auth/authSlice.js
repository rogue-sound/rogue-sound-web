import { createSlice } from '@reduxjs/toolkit';
import { clearMe } from '@context/me';
import { resetDevices } from '@context/spotify';

const initialState = {
  token: localStorage.getItem('token') || '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => ({
      token: action.payload,
    }),
    clearToken: () => {
      localStorage.removeItem('token');
      return { token: '' };
    },
    logout: () => ({ token: '' }),
  },
});

export const { setToken, clearToken, logout } = authSlice.actions;

export default authSlice.reducer;

export const setTokenAction = token => async dispatch => {
  dispatch(setToken(token));
};

export const logoutAction = () => async dispatch => {
  dispatch(clearToken());
  dispatch(clearMe());
  dispatch(resetDevices());
};

export const clearTokenAction = () => async dispatch => {
  dispatch(clearToken());
};
