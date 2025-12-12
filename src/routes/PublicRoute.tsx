// Libs
import ResetPasswordPage from '@/pages/auth/ResetPasswordPage';
import ResetPasswordSuccessPage from '@/pages/auth/ResetPasswordSuccessPage';
import ForgotPasswordPage from '@/pages/auth/ForgotPasswordPage';
import SignInPage from '@/pages/auth/SignInPage';
import VerifyOTPPage from '@/pages/auth/VerifyOTPPage';
import type { RouteObject } from 'react-router';
// Pages

export const PUBLIC_ROUTES: RouteObject[] = [
  {
    path: 'signin',
    element: <SignInPage />,
  },
  {
    path: 'forgot-password',
    element: <ForgotPasswordPage />,
  },
  {
    path: 'verify-otp',
    element: <VerifyOTPPage />,
  },
  {
    path: 'reset-password',
    element: <ResetPasswordPage />,
  },
  {
    path: 'reset-password/success',
    element: <ResetPasswordSuccessPage />,
  },
];
