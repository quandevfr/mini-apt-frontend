// Libs
import { useEffect, useRef } from 'react';

// Others
import { hideLoading, resetLoading, showLoading } from '@/features/global/loadingSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

export const useGlobalLoading = () => {
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector((state) => state.loading.isLoading);

  const timeoutRef = useRef<number | null>(null);

  const startLoading = () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    dispatch(showLoading());
  };

  const stopLoading = () => {
    timeoutRef.current = window.setTimeout(() => {
      dispatch(hideLoading());
    }, 300);
  };

  const forceStopAll = () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    dispatch(resetLoading());
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    isLoading,
    startLoading,
    stopLoading,
    forceStopAll,
  };
};
