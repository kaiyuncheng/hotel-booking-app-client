import { configureStore } from '@reduxjs/toolkit';
import { homeServices } from '@/store/services/homeServices';
import authReducer from '@/store/slices/authSlice';

export const store = configureStore({
  reducer: {
    [homeServices.reducerPath]: homeServices.reducer,
    authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(homeServices.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
