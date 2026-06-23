import { useNavigate, type NavigateOptions, type To } from 'react-router';
import NProgress from 'nprogress';

export const useCustomNavigate = () => {
  const navigate = useNavigate();

  const appNavigate = (to: To | number, options?: NavigateOptions) => {
    NProgress.start();

    if (typeof to === 'number') {
      navigate(to);
    } else {
      navigate(to, options);
    }
  };

  return appNavigate;
};
