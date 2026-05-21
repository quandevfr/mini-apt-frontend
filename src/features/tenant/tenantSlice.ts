import type { Tenant } from '@/components/TenantList';
import { createSlice } from '@reduxjs/toolkit';
import { getTenants } from './tenantThunk';

interface TenantState {
  list: Tenant[];
  loading: boolean;
}

const initialState: TenantState = {
  list: [],
  loading: false,
};

const tenantSlice = createSlice({
  name: 'tenant',
  initialState,
  reducers: {
    clearTenant(state) {
      state.list = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getTenants.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTenants.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(getTenants.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { clearTenant } = tenantSlice.actions;
const tenantReducer = tenantSlice.reducer;
export default tenantReducer;
