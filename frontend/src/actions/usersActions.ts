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
  AcceptInvitePayload,
  changePasswordPayload,
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

export const acceptInvite = async (data: AcceptInvitePayload) => {
  return axiosFetch<UserResponse>({
    url: API.users.acceptInvite,
    method: 'post',
    data,
  });
};

export const changePassword = async (data: changePasswordPayload, userId: number) => {
  return axiosFetch<UserResponse>({
    url: API.users.changePassword(userId),
    method: 'patch',
    data,
  });
};

export const changePicture = async (file: File, userId: number) => {
  const formData = new FormData();
  formData.append('file', file);

  return axiosFetch<UserResponse>({
    url: API.users.setProfilePicture(userId),
    method: 'patch',
    data: formData,
  });
};
