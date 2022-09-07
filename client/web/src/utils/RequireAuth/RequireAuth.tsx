import { useLocation, Navigate, Outlet } from 'react-router-dom';

import { useAppSelector } from '../../hooks/redux';

// import useAuth from "../hooks/useAuth";

function RequireAuth(): JSX.Element {
  const { user } = useAppSelector((state) => state.authReducer);
  const location = useLocation();

  return user.isAnonym ? <Navigate to="/login" state={{ from: location }} replace /> : <Outlet />;
}

export default RequireAuth;
