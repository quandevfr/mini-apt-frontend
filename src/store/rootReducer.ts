import apartmentReducer from '@/features/apartment/apartmentSlice';
import roomReducer from '@/features/room/roomSlice';
import { combineReducers } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
  //   invoice: invoiceReducer,
  apartment: apartmentReducer,
  room: roomReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
