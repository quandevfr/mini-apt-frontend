import axiosClient from './axiosClient';

export const getTenantApi = async () => {
  const res = await axiosClient.get('/tenants');
  return res.data;
};
