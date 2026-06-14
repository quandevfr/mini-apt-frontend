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
import { useAppDispatch } from '@/store/hooks';
import { signIn } from '@/features/auth/authThunk';
import { PATHS } from '@/utils/constants/paths';
import { Alert, AlertDescription } from '@/components/ui/alert';

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
  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onSubmit = async (data: SignInFormValues) => {
    try {
      await dispatch(signIn(data)).unwrap();

      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      className={cn('flex flex-col gap-6', className)}
      {...props}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">
          Chào mừng đến với <br /> Mini Apt Management!
        </h1>
        <p className="text-balance text-sm text-muted-foreground">
          Đăng nhập tài khoản của bạn để bắt đầu
        </p>
      </div>

      <Alert className="border-sky-400 bg-sky-900">
        <AlertDescription>
          Sử dụng <span className="font-bold">demoapt@gmail.com</span> với mật khẩu{' '}
          <span className="font-bold">@Miniapt</span>
        </AlertDescription>
      </Alert>

      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="example@gmail.com"
            {...register('email')}
            tabIndex={1}
          />
          {errors.email && <p className="text-destructive text-sm">{errors.email.message}</p>}
        </div>

        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Mật khẩu</Label>
            <Link
              to={PATHS.AUTH.FORGOT_PASSWORD}
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
              tabIndex={2}
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

        <Button type="submit" className="w-full" disabled={isSubmitting} tabIndex={3} size={'lg'}>
          {isSubmitting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : 'Đăng nhập'}
        </Button>
      </div>

      {/* <div className="text-center text-sm">
        Bạn chưa có tài khoản?{' '}
        <Link to={PATH.AUTH.SIGNUP} className="underline underline-offset-4">
          Đăng ký
        </Link>
      </div> */}
    </form>
  );
};
