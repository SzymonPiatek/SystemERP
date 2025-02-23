import { Dispatch, SetStateAction } from 'react';
import { AxiosError } from 'axios';

// DB Models

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

export type Profile = {
  id: number;
  profilePicId?: number;
  roleId: number;
  userId: number;
  profilePic?: File;
  profilePicBase64?: string;
  role?: Role;
  user?: User;
};

export type File = {
  id: number;
  filePath: string;
  fileName: string;
  fileType: string;
};

export type Event = {
  id: number;
  title: string;
  start: Date;
  end: Date;
  ownerId: number;
  invitations: EventInvitation[];
};

export type EventInvitation = {
  id: number;
  user: User;
  event: Event;
  userId: number;
  eventId: number;
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

// Responses

export type BaseResponse = {
  success: boolean;
  message: string;
};

// Company Responses

export type CompaniesResponse = BaseResponse & { data: Company[] };

// Event Responses

export type EventsResponse = BaseResponse & { events: Event[] };

export type EventResponse = BaseResponse & { event: Event };

export type EditEventPayload = {
  title: string;
  startDate: string;
  endDate: string;
};

export type AddEventPayload = {
  title: string;
  startDate: string;
  endDate: string;
  ownerId: number;
};

// Note Responses

export type NoteResponse = BaseResponse & {
  note: Note;
};

export type EditNotePayload = {
  title: string;
  description: string;
};

export type AddNotePayload = {
  title: string;
  description: string;
  date?: Date;
  ownerId: number;
};

// User Responses

export type UserResponse = {
  success: boolean;
  message: string;
};

export type EditUserPayload = {
  firstName: string;
  lastName: string;
  email: string;
};

export type AcceptInvitePayload = {
  token: string;
  password: string;
};

export type RegisterUserPayload = {
  firstName: string;
  lastName: string;
  email: string;
  roleId: number;
  companyId?: number | null;
};

// Auth Responses

export type LoginDataProps = {
  email: string;
  password: string;
};

export type LoginResponse = BaseResponse & {
  user: User;
};

export type TableData<T> = {
  data: T[];
  limit: number;
  page: number;
  previous: number;
  next: number;
  total: number;
  totalPages: number;
  message?: string;
};

export type ErrorResponse = {
  message?: string;
  errors?: string[];
};

export type ToastForErrorHookErrorType = AxiosError & { response: { data: { message?: string } } };

export type QueryParamsProps = Record<string, string | number | null>;

export type SetQueryParams = Dispatch<SetStateAction<QueryParamsProps>>;
