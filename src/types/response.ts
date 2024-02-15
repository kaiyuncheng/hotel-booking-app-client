export interface IRes {
  status: boolean;
  message?: string;
}

export interface IErrorRes {
  status: number;
  data: IRes;
}
