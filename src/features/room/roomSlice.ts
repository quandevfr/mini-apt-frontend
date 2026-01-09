import { createSlice } from '@reduxjs/toolkit';
import { getRooms } from './roomThunk';
import type { Room } from '@/components/RoomList';

interface RoomState {
  list: Room[];
  loading: boolean;
}

const initialState: RoomState = {
  list: [],
  loading: false,
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
        state.loading = true;
      })
      .addCase(getRooms.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(getRooms.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { clearRoom } = roomSlice.actions;
const roomReducer = roomSlice.reducer;
export default roomReducer;
