// Libs
import { Outlet } from 'react-router';

// Components
import { AppSidebar } from '@/components/sidebar/app-sidebar';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { ModeToggle } from '@/components/theme/modeToggle';
import { cn } from '@/libs/utils';
import { AppBreadcrumbs } from '@/components/AppBreadcrumbs';

const MainLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset className="beautiful-scrollbar">
        <header
          className={cn(
            'flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12',
            'sticky top-0 z-40',
            'backdrop-blur supports-backdrop-filter:bg-background/60 border-b'
          )}
        >
          <div className="w-full flex items-center justify-between gap-2 px-6">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />

              <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />

              <AppBreadcrumbs />
            </div>

            <div className="flex items-center justify-end gap-2">
              <ModeToggle />
            </div>
          </div>
        </header>

        <div className="flex flex-1 flex-col">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default MainLayout;
