/* eslint-disable @typescript-eslint/no-explicit-any */
import type { User } from '@/types/user';

export interface SignInReq {
  email: string;
  password: string;
}

export interface SignInRes {
  accessToken: string;
  user: User;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
  errors?: any;
  statusCode?: number;
}
