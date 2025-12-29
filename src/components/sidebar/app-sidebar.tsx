'use client';

import * as React from 'react';
import {
  BedDouble,
  Building,
  FileText,
  FileX,
  GalleryVerticalEnd,
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
import { PATH } from '@/utils/paths';
import { Link } from 'react-router';

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
      url: PATH.PAGE.DASHBOARD,
      icon: LayoutDashboard,
    },
    {
      title: 'Gửi thông báo',
      url: PATH.PAGE.SENT_MESSAGE,
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
          url: PATH.PAGE.APARTMENTS.INDEX,
        },
        {
          title: 'Thêm mới',
          url: PATH.PAGE.APARTMENTS.CREATE,
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
          url: PATH.PAGE.ROOMS.INDEX,
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
          url: PATH.PAGE.TENANTS.INDEX,
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
          url: PATH.PAGE.INVOICES,
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
          url: PATH.PAGE.REQUEST,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to={PATH.PAGE.DASHBOARD}>
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <GalleryVerticalEnd className="size-4" />
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
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
