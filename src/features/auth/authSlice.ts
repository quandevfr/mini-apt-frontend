// Libs
import { createSlice } from '@reduxjs/toolkit';

// Others
import { fetchMe, signIn, signOut } from '@/features/auth/authThunk';
import type { User } from '@/types/user';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isInitialized: boolean;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  isInitialized: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Sign In
      .addCase(signIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isInitialized = true;
      })
      .addCase(signIn.rejected, (state) => {
        state.isLoading = false;
      })

      // Fetch Me
      .addCase(fetchMe.pending, (state) => {
        state.isInitialized = false;
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isInitialized = true;
      })
      .addCase(fetchMe.rejected, (state) => {
        state.user = null;
        state.isInitialized = true;
      })

      // Sign Out
      .addCase(signOut.fulfilled, (state) => {
        state.user = null;
        state.isLoading = false;
      });
  },
});

export const { clearState } = authSlice.actions;

const authReducer = authSlice.reducer;
export default authReducer;
