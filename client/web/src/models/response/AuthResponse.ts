import { IUser } from '../IUser';

export interface IAuthResponse {
  access_token: string;
  user: IUser;
}
