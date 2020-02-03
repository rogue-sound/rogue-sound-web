import { createSlice } from '@reduxjs/toolkit';
import { getMe } from '@services/spotify';
import { clearTokenAction } from '@context/auth';

const initialState = {
  displayName: '',
  avatarUrl: '',
  country: '',
};

const meSlice = createSlice({
  name: 'me',
  initialState,
  reducers: {
    getMeSuccess: (state, action) => ({
      ...action.payload,
    }),
    getMeError: () => initialState,
    clearMe: () => initialState,
  },
});

export const { getMeSuccess, getMeError, clearMe } = meSlice.actions;

export default meSlice.reducer;

export const fetchMeAction = () => async dispatch => {
  try {
    const me = await getMe();
    const meState = {
      displayName: me.display_name,
      avatarUrl: me.images[0].url,
      country: me.country,
    };
    dispatch(getMeSuccess(meState));
  } catch (err) {
    const {
      response: { status },
    } = err;
    // Token expired
    status === 401 && dispatch(clearTokenAction());
    dispatch(getMeError(err.toString()));
  }
};
