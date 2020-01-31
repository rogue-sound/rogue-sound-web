import { createSlice } from '@reduxjs/toolkit';
import { getCurrent } from '@services/spotify';
import { clearTokenAction } from '@context/auth';

const initialState = {
  loading: false,
  active: false,
  current: {},
  queue: [],
};

const playingSlice = createSlice({
  name: 'playing',
  initialState,
  reducers: {
    setLoading: () => ({ loading: true }),
    setCurrent: (state, action) => ({
      ...state,
      loading: false,
      current: action.payload,
    }),
    setQueue: (state, action) => ({
      ...state,
      loading: false,
      queue: action.payload,
    }),
    stop: () => initialState,
  },
});

export const { setLoading, setCurrent, setQueue, stop } = playingSlice.actions;

export default playingSlice.reducer;
