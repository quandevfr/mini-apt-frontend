// Libs
import React, { useEffect } from 'react';

// Others
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchMe, refresh } from '@/features/auth/authThunk';
import { setInitialized } from '@/features/auth/authSlice';

interface AppInitializerProps {
  children: React.ReactNode;
}

const AppInitializer = (props: AppInitializerProps) => {
  const { children } = props;
  const dispatch = useAppDispatch();
  const { isInitialized } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const initApp = async () => {
      try {
        await dispatch(refresh()).unwrap();

        await dispatch(fetchMe()).unwrap();
      } catch (error) {
        console.error(error);
      } finally {
        dispatch(setInitialized());
      }
    };

    initApp();
  }, [dispatch]);

  if (!isInitialized) {
    return (
      <div className="flex h-screen items-center justify-center">Đang khởi tạo ứng dụng...</div>
      // <></>
    );
  }

  return <>{children}</>;
};

export default AppInitializer;
