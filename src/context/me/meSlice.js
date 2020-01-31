import { createSlice } from '@reduxjs/toolkit';
import { getMe } from '@services/spotify';
import { clearToken } from '@context/auth';

const initialState = {
  username: '',
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
    resetMe: () => initialState,
  },
});

export const { getMeSuccess, getMeError, resetMe } = meSlice.actions;

export default meSlice.reducer;

export const fetchMeAction = () => async dispatch => {
  try {
    const me = await getMe();
    const meState = {
      username: me.display_name,
      avatarUrl: me.images[0].url,
      country: me.country,
    };
    dispatch(getMeSuccess(meState));
  } catch (err) {
    const {
      response: { status },
    } = err;
    // Token expired
    status === 401 && dispatch(clearToken());
    dispatch(getMeError(err.toString()));
  }
};
