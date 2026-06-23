import { Link, type LinkProps } from 'react-router';
import NProgress from 'nprogress';

export const CustomLink = ({ onClick, ...props }: LinkProps) => {
  return (
    <Link
      {...props}
      onClick={(e) => {
        NProgress.start();
        if (onClick) onClick(e);
      }}
    />
  );
};
