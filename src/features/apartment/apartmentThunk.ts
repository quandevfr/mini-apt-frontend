// Libs
import { createAsyncThunk } from '@reduxjs/toolkit';

// Apis
import { apartmentApi } from '@/apis/apartmentApi';
import { uploadApi } from '@/apis/uploadApi';

// Others
import type {
  CreateApartmentData,
  CreateApartmentReq,
  UpdateApartmentData,
} from '@/types/apartment';
import type { ApartmentQuery } from '@/types/query';
import type { DeleteManyPayload } from '@/types/common';

export const createApartment = createAsyncThunk(
  'apartments/create',
  async (body: CreateApartmentData, { rejectWithValue }) => {
    try {
      let uploadedImageUrls: string[] = [];

      if (body.images && body.images.length > 0) {
        const formData = new FormData();

        body.images?.forEach((file) => {
          formData.append('images', file);
        });

        const uploadRes = await uploadApi.upload(formData);
        uploadedImageUrls = uploadRes.data;
      }

      const newBody: CreateApartmentReq = {
        ...body,
        images: uploadedImageUrls,
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

export const getApartmentById = createAsyncThunk(
  'apartments/getById',
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await apartmentApi.getApartmentById(id);

      return res.data;
    } catch {
      return rejectWithValue('get apartment detail failed');
    }
  }
);

export const deleteApartment = createAsyncThunk(
  'apartments/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await apartmentApi.deleteById(id);

      return res.data;
    } catch {
      return rejectWithValue('delete apartment failed');
    }
  }
);

export const deleteApartments = createAsyncThunk(
  'apartments/delete-many',
  async (body: DeleteManyPayload, { rejectWithValue }) => {
    try {
      const res = await apartmentApi.deleteMany(body);

      return res.data;
    } catch {
      return rejectWithValue('delete apartments failed');
    }
  }
);

export const updateApartment = createAsyncThunk(
  'apartments/update',
  async ({ id, body }: { id: string; body: UpdateApartmentData }, { rejectWithValue }) => {
    try {
      let newImageUrls: string[] = [];

      if (body.images && body.images.length > 0) {
        const formData = new FormData();
        body.images.forEach((file) => formData.append('images', file));

        const uploadRes = await uploadApi.upload(formData);
        newImageUrls = uploadRes.data;
      }

      const newBody: Partial<CreateApartmentReq> = {
        ...body,
        images: [...(body.existingImages ?? []), ...newImageUrls],
      };

      const res = await apartmentApi.updateApartment(id, newBody);

      return res.data;
    } catch {
      return rejectWithValue('update apartments failed');
    }
  }
);
