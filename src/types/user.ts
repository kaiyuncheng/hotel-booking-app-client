export interface IAddress {
  zipcode?: string | number | null;
  detail?: string;
  county?: string;
  city?: string;
}

export interface IBirthday {
  year?: string;
  month?: string;
  day?: string;
}

export interface IUser {
  _id?: string;
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
  birthday?: IBirthday | string;
  address?: IAddress;
  createdAt?: string;
  updatedAt?: string;
}
