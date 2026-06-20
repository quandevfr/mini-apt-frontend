import { addressApi } from '@/apis/addressApi';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getProvinces = createAsyncThunk(
  'address/provinces',
  async (_, { rejectWithValue }) => {
    try {
      const res = await addressApi.getProvinces();

      return res.data;
    } catch {
      return rejectWithValue('get provinces failed');
    }
  }
);

export const getWardsByProvinceCode = createAsyncThunk(
  'address/wards',
  async (provinceCode: string, { rejectWithValue }) => {
    try {
      const res = await addressApi.getWardsByProvinceCode(provinceCode);

      return res.data;
    } catch {
      return rejectWithValue('get wards by provinceCode failed');
    }
  }
);
