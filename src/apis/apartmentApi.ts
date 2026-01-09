import api from './axiosClient';

export const getApartmentsApi = async () => {
  const res = await api.get('/apartments');
  return res.data;
};
