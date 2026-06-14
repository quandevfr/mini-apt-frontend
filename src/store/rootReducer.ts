import apartmentReducer from '@/features/apartment/apartmentSlice';
import authReducer from '@/features/auth/authSlice';
import roomReducer from '@/features/room/roomSlice';
import tenantReducer from '@/features/tenant/tenantSlice';
import { combineReducers } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
  //   invoice: invoiceReducer,
  apartment: apartmentReducer,
  room: roomReducer,
  tenant: tenantReducer,
  auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
