'use client';

import * as React from 'react';
import {
  BedDouble,
  Building,
  FileText,
  FileX,
  LayoutDashboard,
  MessageCircleMore,
  Users,
} from 'lucide-react';

import { NavMain } from '@/components/sidebar/nav-main';
import { NavUser } from '@/components/sidebar/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import { NavMainButton } from './nav-main-button';
import { Link } from 'react-router';
import miniAptLogo from '@/assets/logo/mini-apt-logo.png';
import { PATHS } from '@/utils/constants/paths';
import { useAppSelector } from '@/store/hooks';

// This is sample data.
const data = {
  user: {
    name: 'Quaan',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navOverview: [
    {
      title: 'Thống kê',
      url: PATHS.PAGE.DASHBOARD,
      icon: LayoutDashboard,
    },
    {
      title: 'Gửi thông báo',
      url: PATHS.PAGE.SENT_MESSAGE,
      icon: MessageCircleMore,
    },
  ],
  navMain: [
    {
      title: 'Chung cư mini',
      url: '#',
      icon: Building,
      isActive: false,
      items: [
        {
          title: 'Danh sách',
          url: PATHS.PAGE.APARTMENTS.INDEX,
        },
        {
          title: 'Thêm mới',
          url: PATHS.PAGE.APARTMENTS.CREATE,
        },
      ],
    },
    {
      title: 'Phòng',
      url: '#',
      icon: BedDouble,
      isActive: false,
      items: [
        {
          title: 'Danh sách',
          url: PATHS.PAGE.ROOMS.INDEX,
        },
      ],
    },
    {
      title: 'Người thuê',
      url: '#',
      icon: Users,
      isActive: false,
      items: [
        {
          title: 'Danh sách',
          url: PATHS.PAGE.TENANTS.INDEX,
        },
      ],
    },
    {
      title: 'Hóa đơn thanh toán',
      url: '#',
      icon: FileText,
      isActive: false,
      items: [
        {
          title: 'Danh sách',
          url: PATHS.PAGE.INVOICES,
        },
      ],
    },
    {
      title: 'Yêu cầu / Báo hỏng',
      url: '#',
      icon: FileX,
      isActive: false,
      items: [
        {
          title: 'Danh sách',
          url: PATHS.PAGE.REQUEST,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to={PATHS.PAGE.DASHBOARD}>
                <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <img src={miniAptLogo} alt="logo" className="" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">Mini Apartment</span>
                  <span className="">v1.0.0</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="beautiful-scrollbar">
        <NavMainButton items={data.navOverview} />
        <NavMain items={data.navMain} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser
          user={{
            avatar: user?.avatarUrl || '',
            name: user?.displayName || '',
            email: user?.email || '',
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
