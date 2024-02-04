import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/store/slices/authSlice';
import { homeServices } from '@/store/services/homeServices';
import { roomServices } from './services/roomServices';

export const store = configureStore({
  reducer: {
    [homeServices.reducerPath]: homeServices.reducer,
    [roomServices.reducerPath]: roomServices.reducer,
    authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(homeServices.middleware).concat(roomServices.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
