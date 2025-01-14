export type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  password?: string;
  companyId?: number | null;
  profile?: Profile | null;
  createdAt: Date;
  updatedAt: Date;
};

export type Profile = {
  id: number;
  profilePicPath?: string | null;
  roleId: number;
  userId: number;
  role: Role;
};

export type Role = {
  id: number;
  name: string;
};
