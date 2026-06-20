// Libs
import { createAsyncThunk } from '@reduxjs/toolkit';

// Apis
import { apartmentApi } from '@/apis/apartmentApi';
import { uploadApi } from '@/apis/uploadApi';

// Others
import type { CreateApartmentData, CreateApartmentReq } from '@/types/apartment';
import type { ApartmentQuery } from '@/types/query';

export const createApartment = createAsyncThunk(
  'apartments/create',
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

export const getApartments = createAsyncThunk(
  'apartments/get',
  async (params: ApartmentQuery | undefined = undefined, { rejectWithValue }) => {
    try {
      const res = await apartmentApi.getApartments(params);

      return res.data;
    } catch {
      return rejectWithValue('get apartments failed');
    }
  }
);
