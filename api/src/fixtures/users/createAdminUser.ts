import { hashPassword } from '../../modules/authModule';

export const createAdminUserData = async () => {
  const hashedPassword = await hashPassword('Testowe123!');

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
