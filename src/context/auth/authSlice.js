import { createSlice } from '@reduxjs/toolkit';
import { clearMe } from '@context/me';
import { resetDevices } from '@context/spotify';
import http from '@services/http';

const initialState = {
  token: localStorage.getItem('token') || '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      localStorage.setItem('token', action.payload);
      state.token = action.payload;
    },
    clearToken: state => {
      localStorage.removeItem('token');
      state.token = '';
    },
    logout: state => {
      state.token = '';
    },
  },
});

export const { setToken, clearToken, logout } = authSlice.actions;

export default authSlice.reducer;

export const setTokenAction = token => async dispatch => {
  http.setToken(token);
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
