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

// export const AUTH_SET_IS_AUTH_LOGIN = 'AUTH_SET_IS_AUTH';
// export const AUTH_SET_IS_AUTH_LOGOUT = 'AUTH_SET_IS_AUTH_LOGOUT';
// export const AUTH_SET_PROCESS_AUTH_START = 'AUTH_SET_PROCESS_AUTH_START';
// export const AUTH_SET_PROCESS_AUTH_END = 'AUTH_SET_PROCESS_AUTH_END';

// export const setIsAuthLogin = () => ({
//   type: AUTH_SET_IS_AUTH_LOGIN,
// });

// export const setIsAuthLogout = () => ({
//   type: AUTH_SET_IS_AUTH_LOGOUT,
// });

// export const setProcessAuthStart = () => ({
//   type: AUTH_SET_PROCESS_AUTH_START,
// });

// export const setProcessAuthEnd = () => ({
//   type: AUTH_SET_PROCESS_AUTH_END,
// });

// const authReduser = (state = defaultState, action) => {
// switch (action.type) {
//     case AUTH_SET_IS_AUTH_LOGIN:
//         return {
//             ...state, isAuth: true,
//         };
//     case AUTH_SET_IS_AUTH_LOGOUT:
//     return {
//         ...state, isAuth: false,
//     };
//     case AUTH_SET_PROCESS_AUTH_START:
//     return {
//         ...state, processAuth: true,
//     };
//     case AUTH_SET_PROCESS_AUTH_END:
//     return {
//         ...state, processAuth: false,
//     };
//     default:
//     return state;
// }
// };

// export default authReduser;

// import {
//     toast
//   } from 'react-toastify';
//   import AuthService from '../../api/AuthService';
//   import {
//     setIsAuthLogin,
//     setIsAuthLogout,
//     setProcessAuthStart,
//     setProcessAuthEnd,
//   } from './actions';

//   import {
//     loadAnonymUser
//   } from '../user/thunks';

//   export const login = (username, password, capcha) => (dispatch) => {
//     dispatch(setProcessAuthStart());
//     AuthService.login(username, password, capcha)
//       .then(response => {
//         localStorage.setItem('token', response.data.auth_token);
//         dispatch(setIsAuthLogin());
//       })
//       .catch(() => {
//         toast.error('Неправильный логин или пароль.', {
//           position: "top-right",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//         });
//       });

//     // Задержка для того, что бы приложение успело обновиться и не вывело сообщение о том,
//     // что страница логин доступна только не авторизованным пользователям
//     setTimeout(() => dispatch(setProcessAuthEnd()), 2000);
//   };

//   export const logout = () => (dispatch) => {
//     AuthService.logout()
//       .then(() => {
//         localStorage.setItem('token', '');
//       })
//       .catch(() => {
//         localStorage.setItem('token', '');
//       });

//     toast.info('Вы успешно вышли из системы.', {
//       position: "top-right",
//       autoClose: 5000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//     });

//     dispatch(loadAnonymUser());
//     dispatch(setIsAuthLogout());
//   };
