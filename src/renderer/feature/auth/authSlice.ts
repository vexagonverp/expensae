/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  isAuth: boolean;
}
const initialState: AuthState = {
  isAuth: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authorize: (state) => {
      state.isAuth = true;
    },
    unAuthorize: (state) => {
      state.isAuth = false;
    }
  }
});

export const { authorize, unAuthorize } = authSlice.actions;

export default authSlice.reducer;
