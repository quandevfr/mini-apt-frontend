// Libs
import { createSlice } from '@reduxjs/toolkit';

// Others
import { getProvinces, getWardsByProvinceCode } from '@/features/address/addressThunk';
import type { Province, WardsByProvinceCode } from '@/types/address';

interface AddressState {
  provinces: Province[];
  wardsByProvinceCode: WardsByProvinceCode | null;
  isProvincesLoading: boolean;
  isWardsLoading: boolean;
}

const initialState: AddressState = {
  provinces: [],
  wardsByProvinceCode: null,
  isProvincesLoading: false,
  isWardsLoading: false,
};

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get Provinces
      .addCase(getProvinces.pending, (state) => {
        state.isProvincesLoading = true;
      })
      .addCase(getProvinces.fulfilled, (state, action) => {
        state.isProvincesLoading = false;
        state.provinces = action.payload;
      })
      .addCase(getProvinces.rejected, (state) => {
        state.isProvincesLoading = false;
      })

      // Get Wards by provinceCode
      .addCase(getWardsByProvinceCode.pending, (state) => {
        state.isWardsLoading = true;
      })
      .addCase(getWardsByProvinceCode.fulfilled, (state, action) => {
        state.isWardsLoading = false;
        state.wardsByProvinceCode = action.payload;
      })
      .addCase(getWardsByProvinceCode.rejected, (state) => {
        state.isWardsLoading = false;
      });
  },
});

const addressReducer = addressSlice.reducer;
export default addressReducer;
