import { AxiosResponse } from 'axios';
import { instancePrivate, instancePublic } from './instances';
import { IAuthResponse } from '../models/response/AuthResponse';
import { INewResponse, IProductResponse } from '../models/response/CMSResponse';
import { ICityResponse } from '../models/response/CityResponse';

export const authAPI = {
  async login(username: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
    return instancePublic.post<IAuthResponse>('/auth/login', {
      email: username,
      password,
    });
  },
  async checkAuth(): Promise<AxiosResponse<IAuthResponse>> {
    return instancePrivate.get<IAuthResponse>('/auth/check', {});
  },
  async logout(): Promise<void> {
    return instancePrivate.post('/auth/logout', {});
  },
};

export const cmsAPI = {
  async news(): Promise<AxiosResponse<Array<INewResponse>>> {
    return instancePublic.get<Array<INewResponse>>('/cms/news', {});
  },
  async product(): Promise<AxiosResponse<IProductResponse>> {
    return instancePublic.get<IProductResponse>('/cms/product', {});
  },
};

export const cityAPI = {
  async detail(): Promise<AxiosResponse<ICityResponse>> {
    return instancePrivate.get<ICityResponse>('/city/detail', {});
  },
  async rts(): Promise<AxiosResponse<Array<string>>> {
    return instancePrivate.get<Array<string>>('/city/rts', {});
  },
};
