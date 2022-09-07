import { useState } from 'react';

import { useNavigate, useLocation } from 'react-router-dom';

// import { authSlice } from '../../store/reducers/AuthSlice';
import { useAppDispatch } from '../../hooks/redux';
import { loginAuth } from '../../store/reducers/ActionCreators';

interface IState {
  from?: IFrom;
}

interface IFrom {
  pathname?: string;
}

// interface IAuthState {
//   isFirstAuth: boolean;
//   isFetching: boolean;
//   error: string;
//   user: IUser;
//   isBadConnection: boolean;
// }

function Login(): JSX.Element {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as IState;
  const from = state.from?.pathname || '/';

  const handleSubmit = async () => {
    const result: boolean = await dispatch(loginAuth(email, password));
    if (result) navigate(from, { replace: true });
  };

  return (
    <div>
      <span>
        Страница логина. Сюда можно попасть по url /login. Так же на эту страницу Вас может перенаправить сайт, в случае если Вы не авторизованы, но хотите получить доступ к приватной информации.
      </span>
      <input onChange={(e) => setEmail(e.target.value)} value={email} type="text" placeholder="Email" />
      <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Пароль" />
      <button type="button" onClick={handleSubmit}>
        Логин
      </button>
    </div>
  );
}

export default Login;
