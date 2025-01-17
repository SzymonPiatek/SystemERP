import { Dispatch, SetStateAction } from 'react';

export type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  companyId: number;
  profile?: Profile;
  roleName?: string;
};

export type Employee = {
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
  role?: Role;
};

export type Event = {
  id: number;
  title: string;
  start: Date;
  end: Date;
  ownerId: number;
};

export type Note = {
  id: number;
  title: string;
  description: string;
  date: Date;
  isActive: boolean;
  ownerId: number;
  createdAt: Date;
  updatedAt: Date;
};

export type NotesResponse = {
  success: boolean;
  message: string;
  notes: Note[];
};

export type NotePayload = {
  ownerId: number;
  title: string;
  description: string;
};

export type EditNotePayload = {
  title: string;
  description: string;
};

export type NoteResponse = {
  success: boolean;
  message: string;
  note: Note;
};

export type TableData<T> = {
  data: T[];
  limit: number;
  page: number;
  previous: number;
  next: number;
  total: number;
  totalPages: number;
};

export type LoginDataProps = {
  email: string;
  password: string;
};

export type LoginResponse = {
  success: boolean;
  message: string;
  user: User;
};

export interface ErrorResponse {
  message?: string;
  errors?: string[];
}

export type QueryParamsProps = Record<string, string | number | null>;

export type SetQueryParams = Dispatch<SetStateAction<QueryParamsProps>>;
