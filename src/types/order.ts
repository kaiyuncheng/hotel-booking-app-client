import { IRoom } from './room';
import { IUser } from './user';

export interface IOrder {
  _id?: string;
  userInfo?: IUser | null;
  roomId?: IRoom | string | null;
  checkInDate?: Date | string | null;
  checkOutDate?: Date | string | null;
  peopleNum?: number;
  orderUserId?: string;
  status?: number;
  createdAt?: string;
  updatedAt?: string;
}
