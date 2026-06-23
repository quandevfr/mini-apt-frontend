// Libs
import { Outlet, useLocation } from 'react-router';
import { useEffect } from 'react';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// Components
import { AppSidebar } from '@/components/sidebar/app-sidebar';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { ModeToggle } from '@/components/theme/modeToggle';
import { cn } from '@/libs/utils';
import { AppBreadcrumbs } from '@/components/AppBreadcrumbs';
import { useGlobalLoading } from '@/hooks/useGlobalLoading';

NProgress.configure({
  showSpinner: false, // ẩn spinner góc phải
  speed: 500, // thời gian hoàn thành animation (ms)
  trickleSpeed: 300, // tốc độ tự động tăng (ms)
  minimum: 0.1, // % bắt đầu (tránh bắt đầu từ 0)
  easing: 'ease', // kiểu animation
  trickle: true, // tự động tăng dần
});

const MainLayout = () => {
  const location = useLocation();
  const { forceStopAll } = useGlobalLoading();

  useEffect(() => {
    forceStopAll();

    NProgress.done();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

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
