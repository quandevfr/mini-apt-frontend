// Libs
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { Link, useNavigate } from 'react-router';

// Components
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

// Others
import { cn } from '@/libs/utils';
import { useAuthFlow } from '@/hooks/useAuthFlow';
import { Loader2 } from 'lucide-react';
import { PATHS } from '@/utils/constants/paths';

const forgotPasswordSchema = z.object({
  email: z.email('Email không hợp lệ.'),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordForm = ({ className, ...props }: React.ComponentProps<'form'>) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const { setEmail } = useAuthFlow();
  const navigate = useNavigate();

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    //

    console.log(data);

    setEmail(data.email);
    navigate(PATHS.AUTH.VERIFY);
  };

  return (
    <form
      className={cn('flex flex-col gap-6', className)}
      {...props}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Quên mật khẩu</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Nhập email để nhận mã OTP xác thực
        </p>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" {...register('email')} />
          {errors.email && <p className="text-destructive text-sm">{errors.email.message}</p>}
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : 'Gửi OTP'}
        </Button>
      </div>

      <div className="text-center text-sm">
        <Link to={PATHS.AUTH.SIGN_IN} className="underline underline-offset-4">
          Quay lại đăng nhập
        </Link>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
