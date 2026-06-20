import axios, { type AxiosResponse } from 'axios';
import type { Province, WardsByProvinceCode } from '@/types/address';

export const addressApi = {
  getProvinces: (): Promise<AxiosResponse<Province[]>> => {
    return axios.get('https://provinces.open-api.vn/api/v2/p/');
  },
  getWardsByProvinceCode: (provinceCode: string): Promise<AxiosResponse<WardsByProvinceCode>> => {
    return axios.get(`https://provinces.open-api.vn/api/v2/p/${provinceCode}?depth=2`);
  },
};
