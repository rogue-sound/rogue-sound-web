import { createSlice } from '@reduxjs/toolkit';
import { getRooms } from '@services/api';

const initialState = {
  rooms: [],
  loading: false,
  error: false,
  skip: 0,
  take: 10,
  hasMore: true,
};

const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    getRoomsPending: state => ({
      ...state,
      loading: true,
    }),
    getRoomsSuccess: (state, { payload }) => ({
      ...state,
      rooms: payload,
      loading: false,
      error: false,
    }),
    getRoomsError: state => ({
      ...state,
      loading: false,
      error: true,
    }),
  },
});

export const {
  getRoomsPending,
  getRoomsSuccess,
  getRoomsError,
} = roomsSlice.actions;

export default roomsSlice.reducer;

export const fetchRooms = () => async dispatch => {
  dispatch(getRoomsPending());

  try {
    const rooms = await getRooms();
    dispatch(getRoomsSuccess(rooms));
  } catch (error) {
    dispatch(getRoomsError());
  }
};
