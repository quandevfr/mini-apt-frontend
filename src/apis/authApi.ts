import axiosClient from './axiosClient';
import type { UserRes } from '@/types/user';
import type { RefreshTokenRes, SignInReq, SignInRes } from '@/types/auth';

export const authApi = {
  signIn: (credentials: SignInReq): Promise<SignInRes> => {
    return axiosClient.post('/auth/signin', credentials, { withCredentials: true });
  },
  signOut: (): Promise<void> => {
    return axiosClient.post('/auth/signout', {}, { withCredentials: true });
  },
  fetchMe: (): Promise<UserRes> => {
    return axiosClient.get('/users/me', { withCredentials: true });
  },
  refresh: (): Promise<RefreshTokenRes> => {
    return axiosClient.post('/auth/refresh', {}, { withCredentials: true });
  },
};
