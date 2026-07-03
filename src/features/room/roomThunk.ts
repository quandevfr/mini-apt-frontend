import { getRoomsApi, roomApi } from '@/apis/roomApi';
import type { CreateRoomReq } from '@/types/room';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getRooms = createAsyncThunk('rooms', async (_, { rejectWithValue }) => {
  try {
    const res = await getRoomsApi();
    return res.data;
  } catch {
    return rejectWithValue('get rooms failed');
  }
});

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
