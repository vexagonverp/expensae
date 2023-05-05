import { configureStore } from '@reduxjs/toolkit';
import authSlice from './feature/auth/authSlice';

// eslint-disable-next-line import/prefer-default-export
const store = configureStore({
  reducer: {
    auth: authSlice
  }
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
