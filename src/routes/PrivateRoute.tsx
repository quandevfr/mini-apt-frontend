// Libs
import { lazy } from 'react';

// Pages
const ApartmentDetailsPage = lazy(() => import('@/pages/apartment/ApartmentDetailsPage'));
const CreateApartmentPage = lazy(() => import('@/pages/apartment/CreateApartmentPage'));
const ApartmentPage = lazy(() => import('@/pages/ApartmentPage'));
const DashboardPage = lazy(() => import('@/pages/DashboardPage'));
const InvoicePage = lazy(() => import('@/pages/InvoicePage'));
const RequestPage = lazy(() => import('@/pages/RequestPage'));
const CreateRoomPage = lazy(() => import('@/pages/room/CreateRoomPage'));
const RoomPage = lazy(() => import('@/pages/RoomPage'));
const SentMessagePage = lazy(() => import('@/pages/SentMessagePage'));
const CreateTenantPage = lazy(() => import('@/pages/tenant/CreateTenantPage'));
const TenantPage = lazy(() => import('@/pages/TenantPage'));

// Others
import { PATHS } from '@/utils/constants/paths';
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
        path: PATHS.PAGE.DASHBOARD,
        element: <DashboardPage />,
        handle: {
          breadcrumb: 'Trang chủ',
        },
      },
      {
        path: PATHS.PAGE.SENT_MESSAGE,
        element: <SentMessagePage />,
        handle: {
          breadcrumb: 'Gửi thông báo',
        },
      },
      {
        path: PATHS.PAGE.APARTMENTS.INDEX,
        handle: {
          breadcrumb: 'Chung cư mini',
        },
        children: [
          {
            index: true,
            element: <ApartmentPage />,
          },
          {
            path: PATHS.PAGE.APARTMENTS.CREATE,
            element: <CreateApartmentPage />,
            handle: {
              breadcrumb: 'Tạo chung cư mini',
            },
          },
          {
            path: PATHS.PAGE.APARTMENTS.DETAILS,
            element: <ApartmentDetailsPage />,
            handle: {
              breadcrumb: 'Chi tiết',
            },
          },
        ],
      },
      {
        path: PATHS.PAGE.ROOMS.INDEX,
        handle: {
          breadcrumb: 'Phòng',
        },
        children: [
          {
            index: true,
            element: <RoomPage />,
          },
          {
            path: PATHS.PAGE.ROOMS.CREATE,
            element: <CreateRoomPage />,
            handle: {
              breadcrumb: 'Tạo phòng',
            },
          },
        ],
      },
      {
        path: PATHS.PAGE.TENANTS.INDEX,
        handle: {
          breadcrumb: 'Người thuê',
        },
        children: [
          {
            index: true,
            element: <TenantPage />,
          },
          {
            path: PATHS.PAGE.TENANTS.CREATE,
            element: <CreateTenantPage />,
            handle: {
              breadcrumb: 'Thêm người thuê',
            },
          },
        ],
      },
      {
        path: PATHS.PAGE.INVOICES,
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
        path: PATHS.PAGE.REQUEST,
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
        path: PATHS.PAGE.APARTMENTS.INDEX,
        element: <ApartmentPage />,
      },
    ],
  },

  //   Role ==> manage
  {
    allowedRoles: ['manage'],
    children: [
      {
        path: PATHS.PAGE.APARTMENTS.INDEX,
        element: <ApartmentPage />,
      },
    ],
  },
];
