import prisma from '../../prismaClient';
import { permissionsData } from './permissionsData';

export const createPermissions = permissionsData.map((permission) =>
  prisma.permission.upsert({
    where: { name: permission.name },
    update: {},
    create: permission,
  }),
);
