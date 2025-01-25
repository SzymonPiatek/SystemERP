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
