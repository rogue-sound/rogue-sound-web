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
    getRoomsSuccess: ({ skip, take, rooms, ...state }, { payload }) => ({
      ...state,
      rooms: [...rooms, ...payload],
      loading: false,
      error: false,
      skip: skip + take,
      take,
      hasMore: payload.length >= take,
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

export const fetchRooms = (
  style = '',
  skip = 0,
  take = 10
) => async dispatch => {
  dispatch(getRoomsPending());

  if (skip === 200) {
    dispatch(getRoomsSuccess([]));
    return;
  }

  try {
    const rooms = await getRooms(style, skip, take);
    dispatch(getRoomsSuccess(rooms));
  } catch (error) {
    dispatch(getRoomsError());
  }
};
