import { RootState } from '../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { IOrder } from '@/types/order';

export interface IOrderForm extends IOrder {
  night?: number;
}

const initialState: IOrderForm = {
  roomId: '',
  checkInDate: null,
  checkOutDate: null,
  peopleNum: 2,
  userInfo: null,
  night: 1,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrder: (state, { payload }: PayloadAction<IOrderForm>) => {
      Object.assign(state, { ...payload });
    },
  },
});

export const { setOrder } = orderSlice.actions;

export const selectOrder = (state: RootState) => state.orderReducer;

export default orderSlice.reducer;
