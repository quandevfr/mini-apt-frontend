import { createSlice } from '@reduxjs/toolkit';
import { createRoom, getRooms, uploadSignature } from './roomThunk';
import type { Room } from '@/components/RoomList';

interface RoomState {
  list: Room[];
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
  list: [],
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
      state.list = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRooms.pending, (state) => {
        state.loading.getList = true;
      })
      .addCase(getRooms.fulfilled, (state, action) => {
        state.loading.getList = false;
        state.list = action.payload;
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
      });
  },
});

export const { clearRoom } = roomSlice.actions;

const roomReducer = roomSlice.reducer;
export default roomReducer;
