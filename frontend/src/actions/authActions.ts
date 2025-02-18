import API from '../utils/apiRoutes';
import axiosFetch from '../utils/axiosFetch.ts';
import { UserResponse } from '../utils/types.ts';

export const logout = async () => axiosFetch({ url: API.auth.logout, method: 'post' });

export const forgotPassword = async (data: { email: string }) => {
  return axiosFetch<UserResponse>({
    url: API.users.forgotPassword,
    method: 'post',
    data,
  });
};
