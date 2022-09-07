import * as axios from 'axios';

import { authSlice } from '../store/reducers/AuthSlice';

import store from '../store/store';

import baseURL from './config';

export const instancePublic = axios.default.create({
  // withCredentials: true,
  baseURL,
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const instancePrivate = axios.default.create({
  // withCredentials: true,
  baseURL,
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

instancePrivate.interceptors.request.use(
  (config) => {
    // eslint-disable-next-line no-param-reassign
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instancePrivate.interceptors.response.use(
  (response) => {
    store.dispatch(authSlice.actions.isGoodConnectionAuth());
    return response;
  },
  async (error) => {
    if (error?.response?.status === undefined || error?.response?.status === 0) {
      store.dispatch(authSlice.actions.isBadConnectionAuth());
    } else if (error.response && error.response.status === 401 && error.response.config.url !== '/auth/login') {
      localStorage.removeItem('jwt');
    }

    throw error;
  },
);

instancePublic.interceptors.response.use(
  (response) => {
    store.dispatch(authSlice.actions.isGoodConnectionAuth());
    return response;
  },
  async (error) => {
    if (error?.response?.status === undefined || error?.response?.status === 0) {
      store.dispatch(authSlice.actions.isBadConnectionAuth());
    }

    throw error;
  },
);
