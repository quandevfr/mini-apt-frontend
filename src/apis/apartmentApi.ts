import api from './axiosClient';

export const getApartments = async () => {
  const res = await api.get('/apartments');
  return res.data;
};
