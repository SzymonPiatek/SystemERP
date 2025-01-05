import axiosFetch from '../utils/axiosFetch';
import API from '../utils/apiRoutes';
import { Employee, TableData, QueryParamsProps } from '../utils/types';

export const getUsers = async (params?: QueryParamsProps) =>
  axiosFetch<TableData<Employee>>({ url: API.users.all, params });
