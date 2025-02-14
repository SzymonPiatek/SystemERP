import axiosFetch from '../utils/axiosFetch';
import API from '../utils/apiRoutes';
import {
  TableData,
  QueryParamsProps,
  User,
  UserResponse,
  BaseResponse,
  EditUserPayload,
  RegisterUserPayload,
} from '../utils/types';

export const getUsers = async (params?: QueryParamsProps) =>
  axiosFetch<TableData<User>>({ url: API.users.all, params });

export const changeUserActivity = async (userId: number) =>
  axiosFetch<BaseResponse>({
    url: API.users.changeActive(userId),
    method: 'patch',
  });

export const editUser = async (data: EditUserPayload, userId: number, params?: QueryParamsProps) =>
  axiosFetch<UserResponse>({
    url: API.users.user(userId),
    method: 'patch',
    data,
    params,
  });
export const registerUser = async (data: RegisterUserPayload): Promise<UserResponse> => {
  return axiosFetch<UserResponse>({
    url: API.users.invite,
    method: 'post',
    data,
  });
};
