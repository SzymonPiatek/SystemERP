import axiosFetch from '../utils/axiosFetch';
import API from '../utils/apiRoutes';
import { Employee, TableData, QueryParamsProps } from '../utils/types';

export const getUsers = async (params?: QueryParamsProps) =>
  axiosFetch<TableData<Employee>>({ url: API.users.all, params });

export const deleteUser = async (userId: number) =>
  axiosFetch<TableData<Employee>>({
    url: API.users.user(userId),
    method: 'delete',
  });
export const editUser = async (
  data: Omit<Employee, 'id' | 'isActive' | 'companyId'>,
  userId: number,
  params?: QueryParamsProps,
) =>
  axiosFetch<TableData<Employee>>({
    url: API.users.user(userId),
    method: 'patch',
    data,
    params,
  });
export const addUser = async (
  data: Omit<Employee, 'id' | 'isActive' | 'companyId'>,
  params?: QueryParamsProps,
) =>
  axiosFetch<TableData<Employee>>({
    url: API.users.all,
    method: 'post',
    data,
    params,
  });
