import type { ApiResponse } from '@/types/common';
import axiosClient from './axiosClient';

export const uploadApi = {
  upload: async (formData: FormData): Promise<ApiResponse<string[]>> => {
    return axiosClient.post('/v1/upload', formData, {
      withCredentials: true,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};
