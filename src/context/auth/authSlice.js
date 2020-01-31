import { createSlice } from '@reduxjs/toolkit';
import { resetMe } from '@context/me';

const initialState = {
  token: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => ({
      token: action.payload,
    }),
    clearToken: () => initialState,
    logout: () => initialState,
  },
});

export const { setToken, clearToken, logout } = authSlice.actions;

export default authSlice.reducer;

export const setTokenAction = token => async dispatch => {
  dispatch(setToken(token));
};

export const logoutAction = () => async dispatch => {
  dispatch(logout());
  dispatch(resetMe());
};
