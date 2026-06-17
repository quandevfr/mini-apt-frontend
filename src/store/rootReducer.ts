import addressReducer from '@/features/address/addressSlice';
import apartmentReducer from '@/features/apartment/apartmentSlice';
import authReducer from '@/features/auth/authSlice';
import loadingReducer from '@/features/global/loadingSlice';
import roomReducer from '@/features/room/roomSlice';
import tenantReducer from '@/features/tenant/tenantSlice';
import uploadReducer from '@/features/upload/uploadSlice';
import { combineReducers } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
  // Global
  loading: loadingReducer,

  //   invoice: invoiceReducer,
  apartment: apartmentReducer,
  room: roomReducer,
  tenant: tenantReducer,
  auth: authReducer,
  address: addressReducer,
  upload: uploadReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
