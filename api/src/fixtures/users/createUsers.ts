import prisma from '../../prismaClient';
import { createUsersData } from './createUsersData';
import { createCompanies } from '@src/fixtures/companies/createCompanies';

type UserDataProps = {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  companyName: string | null; // Change companyId -> companyName for mapping
  profile: {
    create: {
      roleId: number;
    };
  };
};

const createUser = async (userData: UserDataProps, companyMap: Record<string, number>) => {
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
        companyId: userData.companyName ? companyMap[userData.companyName] : null,
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
        companyId: userData.companyName ? companyMap[userData.companyName] : null,
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
  const companyMap = await createCompanies();
  const users = await createUsersData();

  for (const user of users) {
    await createUser(user, companyMap);
  }
};
