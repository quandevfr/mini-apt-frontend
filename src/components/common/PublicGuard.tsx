import { useAppSelector } from '@/store/hooks';
import { PATHS } from '@/utils/constants/paths';
import { Navigate, Outlet } from 'react-router';

const PublicGuard = () => {
  const { user, isInitialized } = useAppSelector((state) => state.auth);

  if (!isInitialized) return null;

  if (user) {
    return <Navigate to={PATHS.PAGE.DASHBOARD} replace />;
  }
  return <Outlet />;
};

export default PublicGuard;
