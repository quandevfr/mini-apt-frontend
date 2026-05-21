import apartmentReducer from '@/features/apartment/apartmentSlice';
import roomReducer from '@/features/room/roomSlice';
import tenantReducer from '@/features/tenant/tenantSlice';
import { combineReducers } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
  //   invoice: invoiceReducer,
  apartment: apartmentReducer,
  room: roomReducer,
  tenant: tenantReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
