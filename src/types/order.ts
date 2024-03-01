import { IRoom } from './room';
import { IUser } from './user';

export interface IOrder {
  _id?: string;
  userInfo?: IUser | null;
  roomId?: IRoom;
  checkInDate?: Date | null;
  checkOutDate?: Date | null;
  peopleNum?: number;
  orderUserId?: string;
  status?: number;
  createdAt?: string;
  updatedAt?: string;
}
