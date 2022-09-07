import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser, anonym } from '../../models/IUser';

interface IAuthState {
  isFirstAuth: boolean;
  isFetching: boolean;
  error: string;
  user: IUser;
  isBadConnection: boolean;
}

const initialState: IAuthState = {
  isFirstAuth: true,
  isFetching: false,
  error: '',
  user: { ...anonym },
  isBadConnection: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authFetching(state) {
      state.isFetching = true;
    },
    authFetchingSuccess(state, action: PayloadAction<IUser>) {
      state.isFetching = false;
      state.error = '';
      state.user = action.payload;
    },
    authFetchingError(state, action: PayloadAction<string>) {
      state.isFetching = false;
      state.error = action.payload;
      state.user = anonym;
    },
    isFirstAuth(state) {
      state.isFirstAuth = false;
    },
    isBadConnectionAuth(state) {
      state.isBadConnection = true;
    },
    isGoodConnectionAuth(state) {
      state.isBadConnection = false;
    },
  },
});

export default authSlice.reducer;
