import axiosFetch from '../utils/axiosFetch';
import API from '../utils/apiRoutes';
import { TableData, QueryParamsProps, User } from '../utils/types';

export const getUsers = async (params?: QueryParamsProps) =>
  axiosFetch<TableData<User>>({ url: API.users.all, params });

export const deleteUser = async (userId: number) =>
  axiosFetch<TableData<User>>({
    url: API.users.user(userId) + '/change_active',
    method: 'patch',
  });
export const editUser = async (
  data: Omit<User, 'id' | 'isActive' | 'companyId'>,
  userId: number,
  params?: QueryParamsProps,
) =>
  axiosFetch<TableData<User>>({
    url: API.users.user(userId),
    method: 'patch',
    data,
    params,
  });
export const addUser = async (
  data: Omit<User, 'id' | 'isActive' | 'companyId'>,
  params?: QueryParamsProps,
) =>
  axiosFetch<TableData<User>>({
    url: API.users.all,
    method: 'post',
    data,
    params,
  });
