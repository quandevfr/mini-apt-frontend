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

  loading: {
    getList: boolean;
    getDetail: boolean;
    create: boolean;
    update: boolean;
    delete: string | null;
    deleteMany: {
      isSubmitting: boolean;
      ids: string[];
    };
  };
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

  loading: {
    getList: false,
    getDetail: false,
    create: false,
    update: false,
    delete: null,
    deleteMany: {
      isSubmitting: false,
      ids: [],
    },
  },
};

const apartmentSlice = createSlice({
  name: 'apartment',
  initialState,
  reducers: {
    clearApartment(state) {
      state.apartments = [];
      state.pagination = initialState.pagination;
    },
    resetApartmentDetail(state) {
      state.apartmentDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /** === GET ALL === */
      .addCase(getApartments.pending, (state) => {
        state.loading.getList = true;
      })
      .addCase(getApartments.fulfilled, (state, action) => {
        state.loading.getList = false;
        state.apartments = action.payload.items;
        state.pagination = action.payload.pagination;
      })
      .addCase(getApartments.rejected, (state) => {
        state.loading.getList = false;
      })

      /** === GET BY ID === */
      .addCase(getApartmentById.pending, (state) => {
        state.loading.getDetail = true;
      })
      .addCase(getApartmentById.fulfilled, (state, action) => {
        state.loading.getDetail = false;
        state.apartmentDetails = action.payload;
      })
      .addCase(getApartmentById.rejected, (state) => {
        state.loading.getDetail = false;
      })

      /** === CREATE === */
      .addCase(createApartment.pending, (state) => {
        state.loading.create = true;
      })
      .addCase(createApartment.fulfilled, (state) => {
        state.loading.create = false;
      })
      .addCase(createApartment.rejected, (state) => {
        state.loading.create = false;
      })

      /** === UPDATE === */
      .addCase(updateApartment.pending, (state) => {
        state.loading.update = true;
      })
      .addCase(updateApartment.fulfilled, (state) => {
        state.loading.update = false;
      })
      .addCase(updateApartment.rejected, (state) => {
        state.loading.update = false;
      })

      /** === DELETE BY ID === */
      .addCase(deleteApartment.pending, (state, action) => {
        state.loading.delete = action.meta.arg;
      })
      .addCase(deleteApartment.fulfilled, (state) => {
        state.loading.delete = null;
      })
      .addCase(deleteApartment.rejected, (state) => {
        state.loading.delete = null;
      })

      /** === DELETE MANY === */
      .addCase(deleteApartments.pending, (state, action) => {
        state.loading.deleteMany.isSubmitting = true;
        state.loading.deleteMany.ids = action.meta.arg.ids;
      })
      .addCase(deleteApartments.fulfilled, (state) => {
        state.loading.deleteMany.isSubmitting = false;
        state.loading.deleteMany.ids = [];
      })
      .addCase(deleteApartments.rejected, (state) => {
        state.loading.deleteMany.isSubmitting = false;
        state.loading.deleteMany.ids = [];
      });
  },
});

export const { clearApartment, resetApartmentDetail } = apartmentSlice.actions;

const apartmentReducer = apartmentSlice.reducer;
export default apartmentReducer;
