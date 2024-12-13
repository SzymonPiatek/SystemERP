export type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
};
