import { hashPassword } from '../../modules/authModule';

const getHashedPassword = async (password: string): Promise<string> => {
  return await hashPassword(password);
};

export const createAdminUserData = async () => {
  const hashedPassword = await getHashedPassword('Testowe123!');

  return {
    email: 'admin@test.pl',
    password: hashedPassword,
    firstName: 'Testowy',
    lastName: 'Admin',
    isActive: true,
    companyId: null,
    profile: {
      create: {
        roleId: 1,
      },
    },
  };
};
