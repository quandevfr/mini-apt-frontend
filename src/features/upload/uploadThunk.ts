// Libs
import { createAsyncThunk } from '@reduxjs/toolkit';

// Others
import { uploadApi } from '@/apis/uploadApi';

export const upload = createAsyncThunk(
  'upload',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const res = await uploadApi.upload(formData);

      return res;
    } catch {
      return rejectWithValue('upload failed');
    }
  }
);
