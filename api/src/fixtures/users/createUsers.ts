import prisma from '../../prismaClient';
import { createUsersData } from './createUsersData';

type UserDataProps = {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  companyId: number | null;
  profile: {
    create: {
      roleId: number;
    };
  };
};

const createUser = async (userData: UserDataProps) => {
  try {
    await prisma.user.upsert({
      where: {
        id: userData.id,
      },
      update: {
        email: userData.email,
        password: userData.password,
        firstName: userData.firstName,
        lastName: userData.lastName,
        isActive: userData.isActive,
        companyId: userData.companyId,
        profile: {
          update: {
            roleId: userData.profile.create.roleId,
          },
        },
      },
      create: {
        email: userData.email,
        password: userData.password,
        firstName: userData.firstName,
        lastName: userData.lastName,
        isActive: userData.isActive,
        companyId: userData.companyId,
        profile: {
          create: {
            roleId: userData.profile.create.roleId,
          },
        },
      },
    });
  } catch (error) {
    console.error('Error processing user:', error);
    throw error;
  }
};

export const createUsers = async () => {
  const users = await createUsersData();

  for (const user of users) {
    await createUser(user);
  }
};
