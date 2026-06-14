// Libs
import { createAsyncThunk } from '@reduxjs/toolkit';

// Apis
import { authApi } from '@/apis/authApi';

// Types
import type { SignInReq } from '@/types/auth';
import { tokenManager } from '@/libs/tokenManager';

export const signIn = createAsyncThunk(
  'auth/signin',
  async (credentials: SignInReq, { rejectWithValue }) => {
    try {
      const res = await authApi.signIn(credentials);
      const token = res.accessToken;

      tokenManager.set(token);

      return res;
    } catch {
      return rejectWithValue('sign in failed');
    }
  }
);

export const signOut = createAsyncThunk('auth/signout', async (_, { rejectWithValue }) => {
  try {
    await authApi.signOut();
  } catch {
    return rejectWithValue('sign out failed');
  } finally {
    tokenManager.clear();
  }
});

export const fetchMe = createAsyncThunk('auth/me', async (_, { rejectWithValue }) => {
  try {
    const refreshRes = await authApi.refresh();
    tokenManager.set(refreshRes.accessToken);

    const res = await authApi.fetchMe();
    return res;
  } catch {
    tokenManager.clear();
    return rejectWithValue('fetch me failed');
  }
});

export const refresh = createAsyncThunk('auth/refresh', async (_, { rejectWithValue }) => {
  try {
    const res = await authApi.refresh();
    return res;
  } catch {
    return rejectWithValue('refresh token failed');
  }
});
