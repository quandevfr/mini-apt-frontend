import type { ApiGetListResponse, ApiResponse } from '@/types/common';
import axiosClient from './axiosClient';
import type { CreateRoomReq, CreateRoomRes, Room, UploadSignatureRes } from '@/types/room';
import axios from 'axios';
import type { RoomQuery } from '@/types/query';

export const getRoomsApi = async () => {
  const res = await axiosClient.get('/rooms');
  return res.data;
};

export const roomApi = {
  createRoom: async (
    body: CreateRoomReq
  ): Promise<ApiResponse<CreateRoomRes | CreateRoomRes[]>> => {
    return axiosClient.post('/v1/rooms', body);
  },

  getUploadSignature: async (): Promise<ApiResponse<UploadSignatureRes>> => {
    return axiosClient.get('/v1/rooms/upload-signature');
  },

  uploadCloudinary: async ({
    cloudName,
    cloudinaryData,
  }: {
    cloudName: string;
    cloudinaryData: FormData;
  }) => {
    return axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, cloudinaryData, {
      headers: {},
      transformRequest: [(data) => data],
    });
  },

  getRooms: async (params?: RoomQuery): Promise<ApiResponse<ApiGetListResponse<Room[]>>> => {
    return axiosClient.get('/v1/rooms', { params });
  },

  deleteById: async (id: string): Promise<ApiResponse<void>> => {
    return axiosClient.delete(`/v1/rooms/${id}`, {
      headers: { 'Skip-Show_Toast': 'true' },
    });
  },
};
