import type { CreateApartmentReq, GetApartmentsResponse } from '@/types/apartment';
import axiosClient from './axiosClient';
import type { ApiGetListResponse, ApiResponse } from '@/types/common';
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
};
