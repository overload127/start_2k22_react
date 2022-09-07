import { useEffect, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from './hooks/redux';
import { checkAuth } from './store/reducers/ActionCreators';

import LayoutAreaExtratop from './components/LayoutAreaExtratop/LayoutAreaExtratop';

import RequireAuth from './utils/RequireAuth/RequireAuth';
import withSuspense from './utils/withSuspense';

import './App.css';

const CMS = lazy(() => import('./apps/CMS/CMS'));
const RTApp = lazy(() => import('./apps/RTApp/RTApp'));
const LoginGlobal = lazy(() => import('./pages/LoginGlobal/LoginGlobal'));
const Page404 = lazy(() => import('./pages/Page404/Page404'));

function App(): JSX.Element {
  const { isFirstAuth, user } = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isFirstAuth) {
    return <div>Загрузка приложения ...</div>;
  }

  return (
    <div>
      <LayoutAreaExtratop />
      <Routes>
        <Route element={<RequireAuth />}>
          <Route path="app/*" element={withSuspense(RTApp)} />
        </Route>

        <Route path="blog/*" element={withSuspense(CMS)} />
        <Route path="login" element={withSuspense(LoginGlobal)} />
        {user.isAnonym ? <Route path="/" element={<Navigate to="/blog" replace />} /> : <Route path="/" element={<Navigate to="/app" replace />} />}
        <Route path="*" element={withSuspense(Page404)} />
      </Routes>
    </div>
  );
}

export default App;
