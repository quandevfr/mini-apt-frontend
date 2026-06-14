import type { User } from '@/types/user';

export interface SignInReq {
  email: string;
  password: string;
}

export interface SignInRes {
  message: string;
  accessToken: string;
  user: User;
}

export type RefreshTokenRes = SignInRes;
