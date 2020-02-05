import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  language: 'en',
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    toggleLanguage: (state, action) => ({
      ...state,
      language: action.payload,
    }),
  },
});

export const { toggleLanguage } = languageSlice.actions;

export default languageSlice.reducer;
