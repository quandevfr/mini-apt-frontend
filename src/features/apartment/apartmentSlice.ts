import { createSlice } from '@reduxjs/toolkit';
import { getApartments } from './apartmentThunk';
import type { Apartment } from '@/pages/ApartmentPage';

interface ApartmentState {
  list: Apartment[];
  loading: boolean;
}

const initialState: ApartmentState = {
  list: [],
  loading: false,
};

const apartmentSlice = createSlice({
  name: 'apartment',
  initialState,
  reducers: {
    clearApartment(state) {
      state.list = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getApartments.pending, (state) => {
        state.loading = true;
      })
      .addCase(getApartments.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(getApartments.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { clearApartment } = apartmentSlice.actions;
const apartmentReducer = apartmentSlice.reducer;
export default apartmentReducer;
