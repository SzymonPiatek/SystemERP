export type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  companyId: number;
  profile?: Profile;
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
  role?: Role;
};

export type Event = {
  id: number;
  title: string;
  start: Date;
  end: Date;
  ownerId: number;
};

export type Notes = {
  id: number;
  title: string;
  description: string;
  isActive: boolean;
  ownerId: number;
  createdAt: Date;
  updatedAt: Date;
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
