'use client';

import * as React from 'react';
import {
  BedDouble,
  Building,
  FileText,
  FileX,
  GalleryVerticalEnd,
  LayoutDashboard,
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
      url: '#',
      icon: LayoutDashboard,
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
          url: '#',
        },
        {
          title: 'Thêm mới',
          url: '#',
        },
      ],
    },
    {
      title: 'Phòng ở',
      url: '#',
      icon: BedDouble,
      isActive: false,
      items: [
        {
          title: 'Danh sách',
          url: '#',
        },
        {
          title: 'Thêm mới',
          url: '#',
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
          url: '#',
        },
        {
          title: 'Thêm mới',
          url: '#',
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
          url: '#',
        },
        {
          title: 'Thêm mới',
          url: '#',
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
          url: '#',
        },
        {
          title: 'Thêm mới',
          url: '#',
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
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">Mini Apartment</span>
                  <span className="">v1.0.0</span>
                </div>
              </a>
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
