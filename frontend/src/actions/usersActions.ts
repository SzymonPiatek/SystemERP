import axiosFetch from '../utils/axiosFetch';
import API from '../utils/apiRoutes';
import { TableData, QueryParamsProps, User, UserResponse } from '../utils/types';

export const getUsers = async (params?: QueryParamsProps) =>
  axiosFetch<TableData<User>>({ url: API.users.all, params });

export const deleteUser = async (userId: number) =>
  axiosFetch<UserResponse>({
    url: API.users.user(userId) + '/change_active',
    method: 'patch',
  });
export const editUser = async (
  data: { firstName: string; lastName: string; email: string },
  userId: number,
  params?: QueryParamsProps,
) =>
  axiosFetch<UserResponse>({
    url: API.users.user(userId),
    method: 'patch',
    data,
    params,
  });
export const addUser = async (
  data: Omit<User, 'id' | 'isActive' | 'companyId'>,
  params?: QueryParamsProps,
) =>
  axiosFetch<UserResponse>({
    url: API.auth.register,
    method: 'post',
    data,
    params,
  });
