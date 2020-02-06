import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  language: localStorage.getItem('language') || 'en',
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    toggleLanguage: (state, action) => {
      localStorage.setItem('language', action.payload);
      return {
        ...state,
        language: action.payload,
      };
    },
  },
});

export const { toggleLanguage } = languageSlice.actions;

export default languageSlice.reducer;
