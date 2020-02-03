import { configureStore, combineReducers } from '@reduxjs/toolkit';
// Wrap in Context
import me from '@context/me';
import auth from '@context/auth';
import playing from '@context/playing';

const rootReducer = combineReducers({
  me,
  auth,
  playing,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
