import { lazy } from 'react';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../hooks/redux';
import { logoutAuth } from '../../store/reducers/ActionCreators';

import withSuspense from '../../utils/withSuspense';

const Page404 = lazy(() => import('../../pages/Page404/Page404'));
const Map = lazy(() => import('../../pages/Map/Map'));
const Journal = lazy(() => import('../../pages/Journal/Journal'));
const RTs = lazy(() => import('../../pages/RTs/RTs'));

function Dashboard(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    // if used in more components, this should be in context
    // axios to /logout endpoint
    dispatch(logoutAuth());
    navigate('/blog');
  };

  return (
    <div>
      <h1>Панель управления. Приватные данные.</h1>
      <ol>
        <li>
          <NavLink to="">Карта</NavLink>
        </li>
        <li>
          <NavLink to="rts">RTs</NavLink>
        </li>
        <li>
          <NavLink to="journal">Журнал</NavLink>
        </li>
        <li>
          <button type="button" onClick={logout}>
            Выход
          </button>
        </li>
      </ol>
      <Routes>
        <Route path="/" element={withSuspense(Map)} />
        <Route path="/rts" element={withSuspense(RTs)} />
        <Route path="/journal" element={withSuspense(Journal)} />
        <Route path="*" element={withSuspense(Page404)} />
      </Routes>
    </div>
  );
}
export default Dashboard;
