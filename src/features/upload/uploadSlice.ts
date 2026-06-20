import { createSlice } from '@reduxjs/toolkit';
import { upload } from '@/features/upload/uploadThunk';

interface ApartmentState {
  files: string[];
  isLoading: boolean;
}

const initialState: ApartmentState = {
  files: [],
  isLoading: false,
};

const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Upload
      .addCase(upload.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(upload.fulfilled, (state, action) => {
        state.isLoading = false;
        state.files = action.payload.data;
      })
      .addCase(upload.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

const uploadReducer = uploadSlice.reducer;
export default uploadReducer;
