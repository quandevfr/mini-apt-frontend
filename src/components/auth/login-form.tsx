// Libs
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router';
import { useState } from 'react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

// Components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Others
import { cn } from '@/libs/utils';
import { PATH } from '@/utils/paths';

const signInSchema = z.object({
  email: z.email('Email không hợp lệ.'),
  password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự.'),
});

type SignInFormValues = z.infer<typeof signInSchema>;

export const LoginForm = ({ className, ...props }: React.ComponentProps<'form'>) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
  });

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onSubmit = async (data: SignInFormValues) => {
    //

    console.log(data);

    navigate(PATH.PAGE.DASHBOARD);
  };

  return (
    <form
      className={cn('flex flex-col gap-6', className)}
      {...props}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Chào mừng quay trở lại</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Đăng nhập tài khoản của bạn để bắt đầu
        </p>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" {...register('email')} />
          {errors.email && <p className="text-destructive text-sm">{errors.email.message}</p>}
        </div>

        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Mật khẩu</Label>
            <Link
              to={PATH.AUTH.FORGOT_PASSWORD}
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Quên mật khẩu?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
            />

            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="size-4 text-muted-foreground" />
              ) : (
                <Eye className="size-4 text-muted-foreground" />
              )}
            </Button>
          </div>
          {errors.password && <p className="text-destructive text-sm">{errors.password.message}</p>}
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : 'Đăng nhập'}
        </Button>
      </div>

      <div className="text-center text-sm">
        Bạn chưa có tài khoản?{' '}
        <Link to={PATH.AUTH.SIGNUP} className="underline underline-offset-4">
          Đăng ký
        </Link>
      </div>
    </form>
  );
};
