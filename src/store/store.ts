import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import { homeServices } from './services/homeServices';
import { roomServices } from './services/roomServices';
import { authServices } from './services/authServices';
import { userServices } from './services/userServices';

export const store = configureStore({
  reducer: {
    [homeServices.reducerPath]: homeServices.reducer,
    [roomServices.reducerPath]: roomServices.reducer,
    [authServices.reducerPath]: authServices.reducer,
    [userServices.reducerPath]: userServices.reducer,
    authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(homeServices.middleware)
      .concat(roomServices.middleware)
      .concat(authServices.middleware)
      .concat(userServices.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
