import { apartmentApi, getApartmentsApi } from '@/apis/apartmentApi';
import { uploadApi } from '@/apis/uploadApi';
import type { CreateApartmentData, CreateApartmentReq } from '@/types/apartment';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getApartments = createAsyncThunk('apartments', async (_, { rejectWithValue }) => {
  try {
    const res = await getApartmentsApi();
    return res.data;
  } catch {
    return rejectWithValue('get apartments failed');
  }
});

export const createApartment = createAsyncThunk(
  'createApartment',
  async (body: CreateApartmentData, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      body.images?.forEach((file) => {
        formData.append('images', file);
      });

      const uploadRes = await uploadApi.upload(formData);

      const newBody: CreateApartmentReq = {
        ...body,
        images: uploadRes.data,
      };

      const res = await apartmentApi.createApartment(newBody);

      return res;
    } catch {
      return rejectWithValue('create apartment failed');
    }
  }
);
