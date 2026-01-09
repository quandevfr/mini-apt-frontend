import axiosClient from './axiosClient';

export const getRoomsApi = async () => {
  const res = await axiosClient.get('/rooms');
  return res.data;
};
