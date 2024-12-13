import { hashPassword } from '../../modules/authModule';

export const createUsersData = async () => {
  const hashedPassword = await hashPassword('Testowe123!');

  return [
    {
      id: 1,
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
    },
    {
      id: 2,
      email: 'entityAdmin@test.pl',
      password: hashedPassword,
      firstName: 'Entity',
      lastName: 'Admin',
      isActive: true,
      companyId: null,
      profile: {
        create: {
          roleId: 2,
        },
      },
    },
    {
      id: 3,
      email: 'owner@test.pl',
      password: hashedPassword,
      firstName: 'Testowy',
      lastName: 'Owner',
      isActive: true,
      companyId: null,
      profile: {
        create: {
          roleId: 3,
        },
      },
    },
    {
      id: 4,
      email: 'manager@test.pl',
      password: hashedPassword,
      firstName: 'Testowy',
      lastName: 'Manager',
      isActive: true,
      companyId: null,
      profile: {
        create: {
          roleId: 4,
        },
      },
    },
    {
      id: 5,
      email: 'worker1@test.pl',
      password: hashedPassword,
      firstName: 'Testowy',
      lastName: 'Worker',
      isActive: true,
      companyId: null,
      profile: {
        create: {
          roleId: 5,
        },
      },
    },
    {
      id: 6,
      email: 'worker2@test.pl',
      password: hashedPassword,
      firstName: 'Testowy',
      lastName: 'Worker2',
      isActive: true,
      companyId: null,
      profile: {
        create: {
          roleId: 5,
        },
      },
    },
    {
      id: 7,
      email: 'worker3@test.pl',
      password: hashedPassword,
      firstName: 'Testowy',
      lastName: 'Worker3',
      isActive: true,
      companyId: null,
      profile: {
        create: {
          roleId: 5,
        },
      },
    },
  ];
};
