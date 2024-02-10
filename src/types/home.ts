export interface INews {
  _id: string;
  title: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICulinary extends INews {
  diningTime: string;
}
