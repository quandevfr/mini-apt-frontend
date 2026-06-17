import type { CreateApartmentReq } from '@/types/apartment';
import axiosClient from './axiosClient';
import api from './axiosClient';

export const getApartmentsApi = async () => {
  const res = await api.get('/apartments');
  return res.data;
};

export const apartmentApi = {
  createApartment: async (body: CreateApartmentReq) => {
    return axiosClient.post('/v1/apartments', body, { withCredentials: true });
  },
};
