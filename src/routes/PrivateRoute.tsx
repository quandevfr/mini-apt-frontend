// Pages
import CreateApartmentPage from '@/pages/apartment/CreateApartmentPage';
import ApartmentPage from '@/pages/ApartmentPage';
import DashboardPage from '@/pages/DashboardPage';
import InvoicePage from '@/pages/InvoicePage';
import RequestPage from '@/pages/RequestPage';
import CreateRoomPage from '@/pages/room/CreateRoomPage';
import RoomPage from '@/pages/RoomPage';
import SentMessagePage from '@/pages/SentMessagePage';
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
        handle: {
          breadcrumb: 'Trang chủ',
        },
      },
      {
        path: PATH.PAGE.SENT_MESSAGE,
        element: <SentMessagePage />,
        handle: {
          breadcrumb: 'Gửi thông báo',
        },
      },
      {
        path: PATH.PAGE.APARTMENTS.INDEX,
        // element: <ApartmentPage />,
        handle: {
          breadcrumb: 'Chung cư mini',
        },
        children: [
          {
            index: true,
            element: <ApartmentPage />,
          },
          {
            path: PATH.PAGE.APARTMENTS.CREATE,
            element: <CreateApartmentPage />,
            handle: {
              breadcrumb: 'Tạo chung cư mini',
            },
          },
        ],
      },
      {
        path: PATH.PAGE.APARTMENTS.CREATE,
        element: <CreateApartmentPage />,
        handle: {
          breadcrumb: 'Tạo chung cư mini',
        },
      },
      {
        path: PATH.PAGE.ROOMS.INDEX,
        element: <RoomPage />,
        handle: {
          breadcrumb: 'Phòng',
        },
      },
      {
        path: PATH.PAGE.ROOMS.CREATE,
        element: <CreateRoomPage />,
        handle: {
          breadcrumb: 'Tạo phòng',
        },
      },
      {
        path: PATH.PAGE.TENANTS,
        element: <TenantPage />,
        handle: {
          breadcrumb: 'Người thuê',
        },
      },
      {
        path: PATH.PAGE.INVOICES,
        element: <InvoicePage />,
        handle: {
          breadcrumb: 'Hoá đơn thanh toán',
        },
      },
      {
        path: PATH.PAGE.REQUEST,
        element: <RequestPage />,
        handle: {
          breadcrumb: 'Yêu cầu / Báo hỏng',
        },
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
