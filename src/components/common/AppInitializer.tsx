// Libs
import React, { useEffect } from 'react';

// Others
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchMe } from '@/features/auth/authThunk';

interface AppInitializerProps {
  children: React.ReactNode;
}

const AppInitializer = (props: AppInitializerProps) => {
  const { children } = props;
  const dispatch = useAppDispatch();
  const { isInitialized } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchMe());
  }, []);

  if (!isInitialized) {
    return (
      //   <div className="flex h-screen items-center justify-center">Đang khởi tạo ứng dụng...</div>
      <></>
    );
  }

  return <>{children}</>;
};

export default AppInitializer;
