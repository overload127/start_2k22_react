import { AppDispatch } from '../store';
import { authSlice } from './AuthSlice';
import { authAPI } from '../../api/api';
import { anonym } from '../../models/IUser';

export const checkAuth = () => async (dispatch: AppDispatch) => {
  if (localStorage.getItem('jwt')) {
    try {
      dispatch(authSlice.actions.authFetching());
      const result = await authAPI.checkAuth();
      localStorage.setItem('jwt', result.data.access_token);
      dispatch(authSlice.actions.authFetchingSuccess(result.data.user));
    } catch (e) {
      console.log(e.response?.data?.message);
      console.log(e.message);
      dispatch(authSlice.actions.authFetchingError(e.message));
    }
  }
  await dispatch(authSlice.actions.isFirstAuth());
};

export const loginAuth = (login: string, password: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(authSlice.actions.authFetching());
    const result = await authAPI.login(login, password);
    localStorage.setItem('jwt', result.data.access_token);
    dispatch(authSlice.actions.authFetchingSuccess(result.data.user));
    return true;
  } catch (e) {
    console.log(e.response?.data?.message);
    console.log(e.message);
    dispatch(authSlice.actions.authFetchingError(e.message));
    return false;
  }
};

export const logoutAuth = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(authSlice.actions.authFetching());
    await authAPI.logout();
    localStorage.setItem('jwt', '');
    dispatch(authSlice.actions.authFetchingSuccess(anonym));
  } catch (e) {
    console.log(e.response?.data?.message);
    console.log(e.message);
    dispatch(authSlice.actions.authFetchingError(e.message));
  }
};

export default null;
