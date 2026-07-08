import { createSlice } from '@reduxjs/toolkit';
import {
  createRoom,
  deleteRoom,
  deleteRooms,
  getRoomById,
  getRooms,
  updateRoom,
  uploadSignature,
} from './roomThunk';
import type { PaginationResponse } from '@/types/common';
import type { GetByIdRes, Room } from '@/types/room';

interface RoomState {
  rooms: Room[];
  pagination: PaginationResponse;
  roomDetail: GetByIdRes | null;

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
  roomDetail: null,

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
    resetRoomDetail(state) {
      state.roomDetail = null;
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

      /** === GET DETAIL === */
      .addCase(getRoomById.pending, (state) => {
        state.loading.getDetail = true;
      })
      .addCase(getRoomById.fulfilled, (state, action) => {
        state.loading.getDetail = false;
        state.roomDetail = action.payload;
      })
      .addCase(getRoomById.rejected, (state) => {
        state.loading.getDetail = false;
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

      /** === UPDATE === */
      .addCase(updateRoom.pending, (state) => {
        state.loading.update = true;
      })
      .addCase(updateRoom.fulfilled, (state) => {
        state.loading.update = false;
      })
      .addCase(updateRoom.rejected, (state) => {
        state.loading.update = false;
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
      })

      /** === DELELE MANY === */
      .addCase(deleteRooms.pending, (state, action) => {
        state.loading.deleteMany.isSubmitting = true;
        state.loading.deleteMany.ids = action.meta.arg.ids;
      })
      .addCase(deleteRooms.fulfilled, (state) => {
        state.loading.deleteMany.isSubmitting = false;
        state.loading.deleteMany.ids = [];
      })
      .addCase(deleteRooms.rejected, (state) => {
        state.loading.deleteMany.isSubmitting = false;
        state.loading.deleteMany.ids = [];
      });
  },
});

export const { clearRoom } = roomSlice.actions;

const roomReducer = roomSlice.reducer;
export default roomReducer;
