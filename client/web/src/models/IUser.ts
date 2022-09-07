export interface IUser {
  id: string;
  email: string;
  isAnonym?: boolean;
}

export const anonym: IUser = {
  id: 'anonym',
  email: 'anonym@dels.pro',
  isAnonym: true,
};
