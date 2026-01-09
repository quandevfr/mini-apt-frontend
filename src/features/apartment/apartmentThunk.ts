import { getApartmentsApi } from '@/apis/apartmentApi';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getApartments = createAsyncThunk('apartments', async (_, { rejectWithValue }) => {
  try {
    const res = await getApartmentsApi();
    return res.data;
  } catch {
    return rejectWithValue('get apartments failed');
  }
});
