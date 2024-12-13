import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

type RoleRouteProps = {
  requiredRole: string;
};

const RoleRoute = ({ requiredRole }: RoleRouteProps) => {
  const { user, isAuthenticated } = useContext(AuthContext);

  if (
    !isAuthenticated ||
    !user ||
    (user && user.profile && user.profile.role && user.profile.role.name !== requiredRole)
  ) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default RoleRoute;
