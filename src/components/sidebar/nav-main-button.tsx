import { type LucideIcon } from 'lucide-react';

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useLocation } from 'react-router';
import { CustomLink } from '@/components/common/CustomLink';

export function NavMainButton({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const location = useLocation();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Tổng quan</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const isActive =
            location.pathname === item.url || location.pathname.startsWith(item.url + '/');

          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                size={'lg'}
                asChild
                className={isActive ? 'bg-sidebar-accent' : ''}
              >
                <CustomLink to={item.url}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </CustomLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
