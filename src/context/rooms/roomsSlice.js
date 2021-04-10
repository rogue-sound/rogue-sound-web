import { createSlice } from '@reduxjs/toolkit';
import { getRooms, createRoom as createRoomAPI } from '@services/api';
import { getRoomStyles } from '../../services/api';
import { noop } from '../../utils/utils';

const initialState = {
  rooms: [],
  styles: [],
  loading: false,
  error: false,
  skip: 0,
  take: 10,
  hasMore: true,
  filters: {
    query: '',
    style: '',
  },
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
    setStyles: (state, { payload }) => ({
      ...state,
      styles: payload,
    }),
    clearRooms: state => ({
      ...initialState,
      filters: {
        ...state.filters,
      },
    }),
    setQueryFilter: (state, { payload }) => ({
      ...state,
      filters: {
        ...state.filters,
        query: payload,
      },
    }),
    setStyleFilter: (state, { payload }) => ({
      ...state,
      filters: {
        ...state.filters,
        style: payload,
      },
    }),
  },
});

export const {
  getRoomsPending,
  getRoomsSuccess,
  getRoomsError,
  setStyles,
  clearRooms,
  setQueryFilter,
  setStyleFilter,
} = roomsSlice.actions;

export default roomsSlice.reducer;

export const fetchRooms = (
  filters = {},
  skip = 0,
  take = 10
) => async dispatch => {
  dispatch(getRoomsPending());

  try {
    const rooms = await getRooms(filters, skip, take);
    dispatch(getRoomsSuccess(rooms));
  } catch (error) {
    dispatch(getRoomsError());
  }
};

export const createRoom = (room, partialUserData) => async dispatch => {
  try {
    await createRoomAPI(room, partialUserData);
    dispatch(clearRooms());
    dispatch(fetchRooms()); // TODO: Pass "style" param to fetchRooms whenever we add the filters to fetch rooms
  } catch (error) {
    console.error(error);
  }
};

export const fetchStyles = () => async dispatch => {
  try {
    const styles = await getRoomStyles();
    dispatch(setStyles(styles));
  } catch (error) {
    noop();
  }
};
