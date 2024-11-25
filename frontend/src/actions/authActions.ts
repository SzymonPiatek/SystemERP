import axiosFetch from '../utils/axiosFetch.ts';
import API from '../utils/apiRoutes.ts';
import { LoginDataProps, User } from '../utils/types.ts';

type LoginResponse = {
  success: boolean;
  message: string;
  accessToken: string;
  refreshToken: string;
  user: User;
};

export const login = async (loginData: LoginDataProps) =>
  axiosFetch<{ data: LoginResponse }>({ url: API.auth.login, method: 'post', data: loginData });
