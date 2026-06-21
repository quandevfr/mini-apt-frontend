import { createSlice } from '@reduxjs/toolkit';
import {
  createApartment,
  deleteApartment,
  deleteApartments,
  getApartments,
} from './apartmentThunk';
import type { GetApartmentsResponse } from '@/types/apartment';
import type { PaginationResponse } from '@/types/common';

interface ApartmentState {
  apartments: GetApartmentsResponse[];
  pagination: PaginationResponse;
  isLoading: boolean;
  isSubmitting: boolean;
}

const initialState: ApartmentState = {
  apartments: [],
  pagination: {
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
    hasNext: false,
    hasPrev: false,
  },
  isLoading: false,
  isSubmitting: false,
};

const apartmentSlice = createSlice({
  name: 'apartment',
  initialState,
  reducers: {
    clearApartment(state) {
      state.apartments = [];
      state.pagination = initialState.pagination;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getApartments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getApartments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.apartments = action.payload.items;
        state.pagination = action.payload.pagination;
      })
      .addCase(getApartments.rejected, (state) => {
        state.isLoading = false;
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
      })

      // Delete apartment
      .addCase(deleteApartment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteApartment.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteApartment.rejected, (state) => {
        state.isLoading = false;
      })

      // Delete apartments
      .addCase(deleteApartments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteApartments.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteApartments.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { clearApartment } = apartmentSlice.actions;
const apartmentReducer = apartmentSlice.reducer;
export default apartmentReducer;
