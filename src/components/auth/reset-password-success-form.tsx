// Libs
import React from 'react';
import { useNavigate } from 'react-router';

// Components
import { Button } from '../ui/button';
import FlowGuard from '../common/FlowGuard';

// Images
import resetSuccessGif from '@/assets/auth/resetSuccess.gif';

// Others
import { cn } from '@/libs/utils';
import { PATH } from '@/utils/paths';
import { useAuthFlow } from '@/hooks/useAuthFlow';

const ResetPasswordSuccessForm = ({ className, ...props }: React.ComponentProps<'div'>) => {
  const navigate = useNavigate();
  const { otp, resetFlow } = useAuthFlow();

  const handleNavigateToSignIn = () => {
    resetFlow();
    navigate(PATH.AUTH.SIGNIN);
  };

  return (
    <FlowGuard condition={!!otp} redirectTo={PATH.AUTH.SIGNIN}>
      <div className={cn('flex flex-col gap-6', className)} {...props}>
        <div className="relative flex items-center justify-center">
          <img src={resetSuccessGif} alt="success" className="size-40" />
        </div>

        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Đặt lại mật khẩu</h1>
          <p className="text-sm text-muted-foreground">
            Đặt lại mật khẩu mới thành công. Hãy đăng nhập lại để bắt đầu
          </p>
        </div>

        <div className="grid gap-6">
          <Button className="w-full" onClick={handleNavigateToSignIn}>
            Đăng nhập ngay
          </Button>
        </div>
      </div>
    </FlowGuard>
  );
};

export default ResetPasswordSuccessForm;
