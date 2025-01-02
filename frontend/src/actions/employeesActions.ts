import axiosFetch from '../utils/axiosFetch';
import API from '../utils/apiRoutes';
import { FilterParams, Employee, TableData } from '../utils/types';
import { AxiosError } from 'axios';

export const getUsers = async (params?: FilterParams) =>
  axiosFetch<TableData<Employee> | AxiosError>({ url: API.users.all, params });
