import { createSlice } from '@reduxjs/toolkit';
import { createRoom, deleteRoom, getRooms, uploadSignature } from './roomThunk';
import type { PaginationResponse } from '@/types/common';
import type { Room } from '@/types/room';

interface RoomState {
  rooms: Room[];
  pagination: PaginationResponse;
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
    uploadSignature: boolean;
  };
}

const initialState: RoomState = {
  rooms: [],
  pagination: {
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
    hasNext: false,
    hasPrev: false,
  },
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
    uploadSignature: false,
  },
};

const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    clearRoom(state) {
      state.rooms = [];
      state.pagination = initialState.pagination;
    },
  },
  extraReducers: (builder) => {
    builder
      /** === GET LIST === */
      .addCase(getRooms.pending, (state) => {
        state.loading.getList = true;
      })
      .addCase(getRooms.fulfilled, (state, action) => {
        state.loading.getList = false;
        state.rooms = action.payload.items;
        state.pagination = action.payload.pagination;
      })
      .addCase(getRooms.rejected, (state) => {
        state.loading.getList = false;
      })

      /** === CREATE === */
      .addCase(createRoom.pending, (state) => {
        state.loading.create = true;
      })
      .addCase(createRoom.fulfilled, (state) => {
        state.loading.create = false;
      })
      .addCase(createRoom.rejected, (state) => {
        state.loading.create = false;
      })

      /** === GET UPLOAD SIGNATURE === */
      .addCase(uploadSignature.pending, (state) => {
        state.loading.uploadSignature = true;
      })
      .addCase(uploadSignature.fulfilled, (state) => {
        state.loading.uploadSignature = false;
      })
      .addCase(uploadSignature.rejected, (state) => {
        state.loading.uploadSignature = false;
      })

      /** === DELELE BY ID === */
      .addCase(deleteRoom.pending, (state, action) => {
        state.loading.delete = action.meta.arg;
      })
      .addCase(deleteRoom.fulfilled, (state) => {
        state.loading.delete = null;
      })
      .addCase(deleteRoom.rejected, (state) => {
        state.loading.delete = null;
      });
  },
});

export const { clearRoom } = roomSlice.actions;

const roomReducer = roomSlice.reducer;
export default roomReducer;
