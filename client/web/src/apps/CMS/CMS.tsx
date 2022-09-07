import { lazy } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';

import withSuspense from '../../utils/withSuspense';

const Home = lazy(() => import('../../pages/Home/Home'));
const Info = lazy(() => import('../../pages/Info/Info'));
const Login = lazy(() => import('../../pages/Login/Login'));
const Page404 = lazy(() => import('../../pages/Page404/Page404'));

function CMS(): JSX.Element {
  return (
    <div>
      <h1>Блог с общедоступной информацией.</h1>
      <ol>
        <li>
          <NavLink to="">Home</NavLink>
        </li>
        <li>
          <NavLink to="info">О компании</NavLink>
        </li>
        <li>
          <NavLink to="login">Login</NavLink>
        </li>
      </ol>
      <Routes>
        <Route path="/" element={withSuspense(Home)} />
        <Route path="/login" element={withSuspense(Login)} />
        <Route path="/info" element={withSuspense(Info)} />
        <Route path="*" element={withSuspense(Page404)} />
      </Routes>
    </div>
  );
}

export default CMS;
