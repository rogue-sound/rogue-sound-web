import { configureStore, combineReducers } from '@reduxjs/toolkit';
// Wrap in Context
import me from '@context/me';
import auth from '@context/auth';

const rootReducer = combineReducers({
  me,
  auth,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
