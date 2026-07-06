import { roomApi } from '@/apis/roomApi';
import type { RoomQuery } from '@/types/query';
import type { CreateRoomReq } from '@/types/room';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const createRoom = createAsyncThunk(
  'rooms/create',
  async (body: CreateRoomReq, { rejectWithValue }) => {
    try {
      const res = await roomApi.createRoom(body);

      return res;
    } catch {
      return rejectWithValue('create apartment failed');
    }
  }
);

export const uploadSignature = createAsyncThunk(
  'rooms/upload-signature',
  async (_, { rejectWithValue }) => {
    try {
      const res = await roomApi.getUploadSignature();

      return res;
    } catch {
      return rejectWithValue('get upload signature failed');
    }
  }
);

export const uploadCloudinary = createAsyncThunk(
  'rooms/upload-cloudinary',
  async (
    { cloudName, cloudinaryData }: { cloudName: string; cloudinaryData: FormData },
    { rejectWithValue }
  ) => {
    try {
      const res = await roomApi.uploadCloudinary({ cloudName, cloudinaryData });

      return res;
    } catch {
      return rejectWithValue('upload cloudinary failed');
    }
  }
);

export const getRooms = createAsyncThunk(
  'rooms/get',
  async (params: RoomQuery | undefined = undefined, { rejectWithValue }) => {
    try {
      const res = await roomApi.getRooms(params);

      return res.data;
    } catch {
      return rejectWithValue('get rooms failed');
    }
  }
);

export const deleteRoom = createAsyncThunk(
  'rooms/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await roomApi.deleteById(id);

      return res.data;
    } catch {
      return rejectWithValue('delete room failed');
    }
  }
);
