export type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  password?: string;
  companyId?: number | null;
  createdAt: Date;
  updatedAt: Date;
};

export type UserWithProfile = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  password?: string;
  companyId?: number | null;
  profile?: Profile;
  createdAt: Date;
  updatedAt: Date;
};

export type Role = {
  id: number;
  name: string;
};

export type Profile = {
  id: number;
  profilePicPath?: string;
  roleId: number;
  userId: number;
  role: Role;
};
