// Libs
import { GalleryVerticalEnd } from 'lucide-react';
import { Outlet } from 'react-router';

// Images
import placeholderSignIn from '@/assets/auth/placeholderSignIn.png';

// Others
import { AuthFlowProvider } from '@/context/AuthFlowContext';
import { CustomLink } from '@/components/common/CustomLink';

const AuthLayout = () => {
  return (
    <AuthFlowProvider>
      <div className="grid min-h-svh lg:grid-cols-2">
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="flex justify-center gap-2 md:justify-start">
            <CustomLink to="#" className="flex items-center gap-2 font-medium">
              <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-4" />
              </div>
              Mini Apartment
            </CustomLink>
          </div>

          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-xs">
              <Outlet />
            </div>
          </div>
        </div>

        <div className="bg-muted relative hidden lg:block">
          <img
            src={placeholderSignIn}
            alt="Image"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </div>
    </AuthFlowProvider>
  );
};

export default AuthLayout;
