import { createSlice } from '@reduxjs/toolkit';
import { getRooms, createRoom as createRoomAPI } from '@services/api';

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
    clearRooms: () => initialState,
  },
});

export const {
  getRoomsPending,
  getRoomsSuccess,
  getRoomsError,
  clearRooms,
} = roomsSlice.actions;

export default roomsSlice.reducer;

export const fetchRooms = (
  style = '',
  skip = 0,
  take = 10
) => async dispatch => {
  dispatch(getRoomsPending());

  if (skip === 100) {
    dispatch(getRoomsSuccess([]));
    return;
  }

  try {
    const rooms = await getRooms(style, skip, take);
    // TODO: Remove setTimeout
    setTimeout(() => {
      dispatch(getRoomsSuccess(rooms));
    }, 1000);
  } catch (error) {
    dispatch(getRoomsError());
  }
};

export const createRoom = room => async dispatch => {
  try {
    await createRoomAPI(room);
    dispatch(clearRooms());
    dispatch(fetchRooms()); // TODO: Pass "style" param to fetchRooms whenever we add the filters to fetch rooms
  } catch (error) {
    console.error(error);
  }
};
