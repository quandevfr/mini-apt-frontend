import { createSlice } from '@reduxjs/toolkit';
import {
  createApartment,
  deleteApartment,
  deleteApartments,
  getApartmentById,
  getApartments,
  updateApartment,
} from './apartmentThunk';
import type { GetApartmentsResponse } from '@/types/apartment';
import type { PaginationResponse } from '@/types/common';

interface ApartmentState {
  apartments: GetApartmentsResponse[];
  pagination: PaginationResponse;
  apartmentDetails: GetApartmentsResponse | null;
  isLoading: boolean;
  isSubmitting: boolean;
  isDetailLoading: boolean;
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
  apartmentDetails: null,
  isLoading: false,
  isSubmitting: false,
  isDetailLoading: false,
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
      // Get all
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

      // Get by id
      .addCase(getApartmentById.pending, (state) => {
        state.isDetailLoading = true;
      })
      .addCase(getApartmentById.fulfilled, (state, action) => {
        state.isDetailLoading = false;
        state.apartmentDetails = action.payload;
      })
      .addCase(getApartmentById.rejected, (state) => {
        state.isDetailLoading = false;
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
      })

      // Update apartments
      .addCase(updateApartment.pending, (state) => {
        state.isSubmitting = true;
      })
      .addCase(updateApartment.fulfilled, (state) => {
        state.isSubmitting = false;
      })
      .addCase(updateApartment.rejected, (state) => {
        state.isSubmitting = false;
      });
  },
});

export const { clearApartment } = apartmentSlice.actions;
const apartmentReducer = apartmentSlice.reducer;
export default apartmentReducer;
