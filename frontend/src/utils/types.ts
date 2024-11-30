export type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  companyId: number;
};

export type Company = {
  id: number;
  name: string;
  country: string;
  voivodeship?: string;
  district?: string;
  commune?: string;
  city: string;
  zipCode: string;
  state: string;
  houseNumber: string;
  apartmentNumber?: string;
  nip: string;
  regon: string;
};

export type Role = {
  id: number;
  name: string;
  action: string;
  subject: string;
};

export type Permission = {
  id: number;
  name: string;
  action: string;
  subject: string;
};

export type PermissionRole = {
  permissionId: number;
  roleId: number;
};

export type Profile = {
  id: number;
  profilePicPath?: string;
  roleId: number;
  userId: number;
};

export type Event = {
  title: string;
  start: Date;
  end: Date;
  [key: string]: any;
};

export type LoginDataProps = {
  email: string;
  password: string;
};

export type LoginResponse = {
  success: boolean;
  message: string;
  accessToken: string;
  refreshToken: string;
  user: User;
};

export interface ErrorResponse {
  message?: string;
  errors?: string[];
}
