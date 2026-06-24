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

// import { NavMain } from '@/components/sidebar/nav-main';
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
  useSidebar,
} from '@/components/ui/sidebar';
import { NavMainButton } from './nav-main-button';
import { PATHS } from '@/utils/constants/paths';
import { useAppSelector } from '@/store/hooks';
import { CustomLink } from '@/components/common/CustomLink';

// This is sample data.
const data = {
  user: {
    name: 'Quaan',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  // Nhóm 1: Tổng quan
  navOverviewGroupName: 'Tổng quan',
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
  // Nhóm 2: Vận hành & con người
  navManagementGroupName: 'Quản lý vận hành',
  navManagement: [
    {
      title: 'Chung cư mini',
      url: PATHS.PAGE.APARTMENTS.INDEX,
      icon: Building,
    },
    {
      title: 'Phòng',
      url: PATHS.PAGE.ROOMS.INDEX,
      icon: BedDouble,
    },
    {
      title: 'Khách thuê',
      url: PATHS.PAGE.TENANTS.INDEX,
      icon: Users,
    },
  ],
  // Nhóm 3: Tài chính & chăm sóc khách hàng
  navFinanceAndSupportGroupName: 'Tài chính & Yêu cầu',
  navFinanceAndSupport: [
    {
      title: 'Hóa đơn thanh toán',
      url: PATHS.PAGE.INVOICES,
      icon: FileText,
    },
    {
      title: 'Yêu cầu / Báo hỏng',
      url: PATHS.PAGE.REQUEST,
      icon: FileX,
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
  const { setOpenMobile } = useSidebar();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <CustomLink
                to={PATHS.PAGE.DASHBOARD}
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenMobile(false);
                }}
              >
                {/* <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg bg-muted">
                  <img src="" alt="logo" className="" />
                </div> */}

                <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">Mini Apartment</span>
                  <span className="text-xs text-sidebar-foreground">v1.0.0</span>
                </div>
              </CustomLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="beautiful-scrollbar">
        <NavMainButton items={data.navOverview} groupName={data.navOverviewGroupName} />
        <NavMainButton items={data.navManagement} groupName={data.navManagementGroupName} />
        <NavMainButton
          items={data.navFinanceAndSupport}
          groupName={data.navFinanceAndSupportGroupName}
        />
        {/* <NavMain items={data.navMain} /> */}
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
