// Libs
import { Navigate, Outlet } from 'react-router';

// Others
import { useAppSelector } from '@/store/hooks';
import { tokenManager } from '@/libs/tokenManager';

interface Props {
  allowedRoles?: string[];
}

const ProtectedRoute = (props: Props) => {
  const { allowedRoles } = props;

  const { user } = useAppSelector((state) => state.auth);

  const hasToken = !!tokenManager.get();

  if (!hasToken || !user) {
    return <Navigate to="/auth/signin" replace />;
  }

  const isAllowed = user?.roles?.find((r) => allowedRoles?.includes(r));

  return isAllowed ? <Outlet /> : <Navigate to={'/unauthorized'} replace />;
};

export default ProtectedRoute;
