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
  profilePicId?: number | null;
  roleId: number;
  userId: number;
  profilePic?: File | null;
  profilePicBase64?: string;
  role: Role;
};

export type File = {
  id: number;
  filePath: string;
  fileName: string;
  fileType: string;
};

export type Role = {
  id: number;
  name: string;
};
