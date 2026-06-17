import { createSlice } from '@reduxjs/toolkit';
import { createApartment, getApartments } from './apartmentThunk';
import type { Apartment } from '@/pages/ApartmentPage';

interface ApartmentState {
  list: Apartment[];
  loading: boolean;
  isSubmitting: boolean;
}

const initialState: ApartmentState = {
  list: [],
  loading: false,
  isSubmitting: false,
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
      })

      // Create apartment
      .addCase(createApartment.pending, (state) => {
        state.isSubmitting = true;
      })
      .addCase(createApartment.fulfilled, (state) => {
        state.isSubmitting = false;
      })
      .addCase(createApartment.rejected, (state) => {
        state.isSubmitting = false;
      });
  },
});

export const { clearApartment } = apartmentSlice.actions;
const apartmentReducer = apartmentSlice.reducer;
export default apartmentReducer;
