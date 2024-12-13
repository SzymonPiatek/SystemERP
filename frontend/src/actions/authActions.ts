import API from '../utils/apiRoutes';
import { LoginDataProps, User } from '../utils/types';
import axiosFetch from '../utils/axiosFetch.ts';

type LoginResponse = {
  success: boolean;
  message: string;
  accessToken: string;
  refreshToken: string;
  user: User;
};

export const login = async (loginData: LoginDataProps) =>
  axiosFetch<{ data: LoginResponse }>({ url: API.auth.login, method: 'post', data: loginData });

export const logout = async () => axiosFetch({ url: API.auth.logout, method: 'post' });
