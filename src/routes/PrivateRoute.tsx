// Pages
import CreateApartmentPage from '@/pages/apartment/CreateApartmentPage';
import ApartmentPage from '@/pages/ApartmentPage';
import DashboardPage from '@/pages/DashboardPage';
import InvoicePage from '@/pages/InvoicePage';
import RequestPage from '@/pages/RequestPage';
import CreateRoomPage from '@/pages/room/CreateRoomPage';
import RoomPage from '@/pages/RoomPage';
import SentMessagePage from '@/pages/SentMessagePage';
import CreateTenantPage from '@/pages/tenant/CreateTenantPage';
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
        path: PATH.PAGE.ROOMS.INDEX,
        handle: {
          breadcrumb: 'Phòng',
        },
        children: [
          {
            index: true,
            element: <RoomPage />,
          },
          {
            path: PATH.PAGE.ROOMS.CREATE,
            element: <CreateRoomPage />,
            handle: {
              breadcrumb: 'Tạo phòng',
            },
          },
        ],
      },
      {
        path: PATH.PAGE.TENANTS.INDEX,
        handle: {
          breadcrumb: 'Người thuê',
        },
        children: [
          {
            index: true,
            element: <TenantPage />,
          },
          {
            path: PATH.PAGE.TENANTS.CREATE,
            element: <CreateTenantPage />,
            handle: {
              breadcrumb: 'Thêm người thuê',
            },
          },
        ],
      },
      {
        path: PATH.PAGE.INVOICES,
        handle: {
          breadcrumb: 'Hoá đơn thanh toán',
        },
        children: [
          {
            index: true,
            element: <InvoicePage />,
          },
        ],
      },
      {
        path: PATH.PAGE.REQUEST,
        handle: {
          breadcrumb: 'Yêu cầu / Báo hỏng',
        },
        children: [
          {
            index: true,
            element: <RequestPage />,
          },
        ],
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
