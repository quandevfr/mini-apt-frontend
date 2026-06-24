// import { Link, type LinkProps } from 'react-router';
// import NProgress from 'nprogress';

// export const CustomLink = ({ onClick, ...props }: LinkProps) => {
//   return (
//     <Link
//       {...props}
//       onClick={(e) => {
//         NProgress.start();
//         if (onClick) onClick(e);
//       }}
//     />
//   );
// };

import { NavLink, type NavLinkProps } from 'react-router';
import NProgress from 'nprogress';
import { cn } from '@/libs/utils';

export const CustomLink = ({ onClick, className, end = true, ...props }: NavLinkProps) => {
  return (
    <NavLink
      {...props}
      className={({ isActive }) =>
        cn(
          typeof className === 'function'
            ? className({ isActive, isPending: false, isTransitioning: false })
            : className,
          isActive && 'pointer-events-none'
        )
      }
      onClick={(e) => {
        NProgress.start();
        if (onClick) onClick(e);
      }}
      end={end}
    />
  );
};
