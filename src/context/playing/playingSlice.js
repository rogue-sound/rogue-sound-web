import { createSlice } from '@reduxjs/toolkit';
import { playSong /* , disableRepeat */ } from '@services/spotify';

const initialState = {
  active: false,
  current: {},
  queue: [],
  device: '',
};

const playingSlice = createSlice({
  name: 'playing',
  initialState,
  reducers: {
    setCurrent: (state, action) => {
      state.current = action.payload;
    },
    setQueue: (state, action) => {
      state.queue = action.payload;
    },
    stop: state => {
      state.current = initialState.current;
    },
    setPlayingDevice: (state, action) => {
      state.device = action.payload;
    },
    reset: () => initialState,
  },
});

export const {
  setCurrent,
  setQueue,
  stop,
  setPlayingDevice,
  reset,
} = playingSlice.actions;

export default playingSlice.reducer;

export const playSongAction = (song, device, current) => async dispatch => {
  try {
    if (!song) throw new Error('Queue has ended');
    const _song = {
      uris: [song.songId],
      position_ms: song.position || 1,
    };
    await playSong(_song, device);
    dispatch(setPlayingDevice(device));
    dispatch(setCurrent(song));
  } catch (err) {
    if (current?.songId) {
      dispatch(stop());
      setCurrent({});
    }
  }
};
