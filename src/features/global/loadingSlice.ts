import { createSlice } from '@reduxjs/toolkit';

interface LoadingState {
  activeRequests: number;
  isLoading: boolean;
}

const initialState: LoadingState = {
  activeRequests: 0,
  isLoading: false,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    // Bật loading (tăng bộ đếm)
    showLoading: (state) => {
      state.activeRequests += 1;
      state.isLoading = state.activeRequests > 0;
    },
    // Tắt loading (giảm bộ đếm)
    hideLoading: (state) => {
      state.activeRequests = Math.max(0, state.activeRequests - 1);
      state.isLoading = state.activeRequests > 0;
    },
    // Hàm reset phòng trường hợp khẩn cấp
    resetLoading: (state) => {
      state.activeRequests = 0;
      state.isLoading = false;
    },
  },
});

export const { showLoading, hideLoading, resetLoading } = loadingSlice.actions;
const loadingReducer = loadingSlice.reducer;
export default loadingReducer;
