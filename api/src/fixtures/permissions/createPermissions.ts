import prisma from '../../prismaClient';
import { permissionsData } from './permissionsData';

export const createPermissions = async () => {
  const upsertPromises = permissionsData.map((permission) =>
    prisma.permission.upsert({
      where: { name: permission.name },
      update: {},
      create: permission,
    }),
  );

  await Promise.all(upsertPromises);
};
