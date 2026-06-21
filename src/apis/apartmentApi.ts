import type { CreateApartmentReq, GetApartmentsResponse } from '@/types/apartment';
import axiosClient from './axiosClient';
import type { ApiGetListResponse, ApiResponse, DeleteManyPayload } from '@/types/common';
import type { ApartmentQuery } from '@/types/query';

export const apartmentApi = {
  createApartment: async (body: CreateApartmentReq) => {
    return axiosClient.post('/v1/apartments', body, { withCredentials: true });
  },

  getApartments: async (
    params?: ApartmentQuery
  ): Promise<ApiResponse<ApiGetListResponse<GetApartmentsResponse[]>>> => {
    return axiosClient.get('/v1/apartments', { params, withCredentials: true });
  },

  deleteById: async (id: string): Promise<ApiResponse<void>> => {
    return axiosClient.delete(`/v1/apartments/${id}`, {
      headers: { 'Skip-Show_Toast': 'true' },
      withCredentials: true,
    });
  },

  deleteMany: async (body: DeleteManyPayload): Promise<ApiResponse<void>> => {
    return axiosClient.delete('/v1/apartments', {
      data: body,
      headers: { 'Skip-Show_Toast': 'true' },
      withCredentials: true,
    });
  },
};
