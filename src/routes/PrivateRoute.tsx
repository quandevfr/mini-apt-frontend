// Libs
// Others
import DashboardPage from '@/pages/DashboardPage';
import type { IPrivateRouteObject } from '@/utils/types';

export const PRIVATE_ROUTES: IPrivateRouteObject[] = [
  {
    allowedRoles: ['admin', 'manage'],
    children: [
      {
        path: 'profiles',
        element: <>Profiles</>,
      },
      {
        path: '/',
        element: <DashboardPage />,
      },
    ],
  },

  //   Role ==> admin
  {
    allowedRoles: ['admin'],
    children: [
      {
        path: 'admin',
        element: <>Admin</>,
      },
    ],
  },

  //   Role ==> manage
  {
    allowedRoles: ['manage'],
    children: [
      {
        path: 'manage',
        element: <>Manage</>,
      },
    ],
  },
];
