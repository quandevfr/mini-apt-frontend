// Libs
import React from 'react';
import z from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router';

// Components
import { Button } from '../ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp';
import { FieldDescription } from '../ui/field';
import FlowGuard from '../common/FlowGuard';

// Others
import { cn } from '@/libs/utils';
import { PATH } from '@/utils/paths';
import { useAuthFlow } from '@/hooks/useAuthFlow';
import { Loader2 } from 'lucide-react';

const verifyOPTSchema = z.object({
  otp: z.string().length(6, 'OTP phải có 6 chữ số.').regex(/^\d+$/, 'OTP chỉ chứa số.'),
});

type VerifyOTPFormValues = z.infer<typeof verifyOPTSchema>;

const VerifyOTPForm = ({ className, ...props }: React.ComponentProps<'form'>) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VerifyOTPFormValues>({
    resolver: zodResolver(verifyOPTSchema),
  });

  const navigate = useNavigate();
  const { email, setOtp } = useAuthFlow();

  const onSubmit = async (data: VerifyOTPFormValues) => {
    //
    console.log(data);

    setOtp(data.otp);

    navigate(PATH.AUTH.RESET_PASSWORD);
  };

  const handleResendOTP = () => {
    //
  };

  return (
    <FlowGuard condition={!!email} redirectTo={PATH.AUTH.SIGNIN}>
      <form
        className={cn('flex flex-col gap-6', className)}
        {...props}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Xác thực OTP</h1>
          <p className="text-balance text-sm text-muted-foreground">
            Nhập mã gồm 6 chữ số được gửi tới email của bạn
          </p>
        </div>

        <div className="grid gap-6">
          <div className="grid gap-2">
            <Controller
              name="otp"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <InputOTP maxLength={6} id="otp" value={field.value} onChange={field.onChange}>
                  <InputOTPGroup className="gap-2.5 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border *:data-[slot=input-otp-slot]:size-11">
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              )}
            />

            {errors.otp && <p className="text-destructive text-sm">{errors.otp.message}</p>}
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : 'Xác thực OTP'}
          </Button>

          <FieldDescription className="text-center">
            Bạn không nhận được mã?{' '}
            <Link to={'#'} onClick={handleResendOTP}>
              Gửi lại
            </Link>
          </FieldDescription>
        </div>
      </form>
    </FlowGuard>
  );
};

export default VerifyOTPForm;
