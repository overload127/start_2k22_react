import { IUser } from '../IUser';

export interface INewResponse {
  oid: string;
  title: string;
  description: string;
  date: string;
}

export interface IProductResponse {
  title: string;
  description: Array<string>;
}
