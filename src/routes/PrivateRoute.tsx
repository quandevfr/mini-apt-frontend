// Pages
import CreateApartmentPage from '@/pages/apartment/CreateApartmentPage';
import ApartmentPage from '@/pages/ApartmentPage';
import DashboardPage from '@/pages/DashboardPage';
import InvoicePage from '@/pages/InvoicePage';
import RequestPage from '@/pages/RequestPage';
import RoomPage from '@/pages/RoomPage';
import TenantPage from '@/pages/TenantPage';

// Others
import { PATH } from '@/utils/paths';
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
        path: PATH.PAGE.DASHBOARD,
        element: <DashboardPage />,
      },
      {
        path: PATH.PAGE.APARTMENTS.INDEX,
        element: <ApartmentPage />,
      },
      {
        path: PATH.PAGE.APARTMENTS.CREATE,
        element: <CreateApartmentPage />,
      },
      {
        path: PATH.PAGE.ROOMS,
        element: <RoomPage />,
      },
      {
        path: PATH.PAGE.TENANTS,
        element: <TenantPage />,
      },
      {
        path: PATH.PAGE.INVOICES,
        element: <InvoicePage />,
      },
      {
        path: PATH.PAGE.REQUEST,
        element: <RequestPage />,
      },
    ],
  },

  //   Role ==> admin
  {
    allowedRoles: ['admin'],
    children: [
      {
        path: PATH.PAGE.APARTMENTS.INDEX,
        element: <ApartmentPage />,
      },
    ],
  },

  //   Role ==> manage
  {
    allowedRoles: ['manage'],
    children: [
      {
        path: PATH.PAGE.APARTMENTS.INDEX,
        element: <ApartmentPage />,
      },
    ],
  },
];
