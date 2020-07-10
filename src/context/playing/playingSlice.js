import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  paused: false,
  current: {},
  queue: [],
};

const playingSlice = createSlice({
  name: 'playing',
  initialState,
  reducers: {
    setCurrent: (state, action) => ({
      ...state,
      current: action.payload,
    }),
    setQueue: (state, action) => ({
      ...state,
      queue: action.payload,
    }),
    stop: state => ({
      ...state,
      current: initialState.current,
    }),
    togglePause: state => ({
      ...state,
      current: initialState.current,
      paused: !state.paused,
    }),
  },
});

export const { setCurrent, setQueue, stop, togglePause } = playingSlice.actions;

export default playingSlice.reducer;
