import { type LucideIcon } from 'lucide-react';

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { useLocation } from 'react-router';
import { CustomLink } from '@/components/common/CustomLink';
import { cn } from '@/lib/utils';

export function NavMainButton({
  items,
  groupName,
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
  groupName?: string;
}) {
  const location = useLocation();
  const { state, setOpenMobile } = useSidebar();
  const isCollapsed = state === 'collapsed';

  return (
    <SidebarGroup>
      {!!groupName && !isCollapsed && <SidebarGroupLabel>{groupName}</SidebarGroupLabel>}
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
                tooltip={item.title}
              >
                <CustomLink
                  to={item.url}
                  className={cn('relative flex items-center')}
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenMobile(false);
                  }}
                >
                  <div
                    className={cn(
                      isCollapsed && 'size-8',
                      ' flex items-center justify-center shrink-0 transition-all ease-in-out'
                    )}
                  >
                    {item.icon && <item.icon className={cn('size-4')} />}
                  </div>

                  <span
                    className={cn(
                      isCollapsed
                        ? 'absolute opacity-0 invisible max-w-0 pointer-events-none'
                        : 'block opacity-100 visible max-w-auto',
                      'transition-all ease-in-out flex-1'
                    )}
                  >
                    {item.title}
                  </span>
                </CustomLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
