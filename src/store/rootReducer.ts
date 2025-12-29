import { combineReducers } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
  //   invoice: invoiceReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
