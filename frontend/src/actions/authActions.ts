import axiosFetch from '../utils/axiosFetch';
import API from '../utils/apiRoutes';
import { LoginDataProps, User } from '../utils/types';

type LoginResponse = {
  success: boolean;
  message: string;
  accessToken: string;
  refreshToken: string;
  user: User;
};

export const login = async (loginData: LoginDataProps) =>
  axiosFetch<{ data: LoginResponse }>({ url: API.auth.login, method: 'post', data: loginData });
