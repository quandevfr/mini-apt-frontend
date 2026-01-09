import { getRoomsApi } from '@/apis/roomApi';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getRooms = createAsyncThunk('rooms', async (_, { rejectWithValue }) => {
  try {
    const res = await getRoomsApi();
    return res.data;
  } catch {
    return rejectWithValue('get rooms failed');
  }
});
