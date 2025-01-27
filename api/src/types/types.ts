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

export type Event = {
  id: number;
  title: string;
  description?: string;
  isAllDay: boolean;
  startDate: Date;
  endDate: Date;
  ownerId: number;
  owner: User;
  invitations: EventInvitation[];
};

export type EventInvitation = {
  id: number;
  eventId: number;
  userId: number;
  user?: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
  event?: Event;
};
