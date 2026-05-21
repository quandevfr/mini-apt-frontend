import { getTenantApi } from '@/apis/tenantApi';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getTenants = createAsyncThunk('tenant/getTenants', async (_, { rejectWithValue }) => {
  try {
    const res = await getTenantApi();
    return res.data;
  } catch {
    return rejectWithValue('get tenants failed');
  }
});
