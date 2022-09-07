import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { loginAuth } from '../../store/reducers/ActionCreators';

function Login(): JSX.Element {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { isBadConnection } = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const result: boolean = await dispatch(loginAuth(email, password));
    if (result) navigate('/');
  };

  console.log(isBadConnection);

  return (
    <div>
      {isBadConnection ? <p>Нет связи</p> : <p>На связи</p>}
      <h2>BLOG LOGIN</h2>
      <input onChange={(e) => setEmail(e.target.value)} value={email} type="text" placeholder="Email" />
      <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Пароль" />
      <button type="button" onClick={handleSubmit}>
        Логин
      </button>
    </div>
  );
}

export default Login;
