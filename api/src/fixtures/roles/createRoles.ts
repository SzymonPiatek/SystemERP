import { rolesData } from './rolesData';
import prisma from '../../prismaClient';

export const createRoles = rolesData.map((role) =>
  prisma.role.upsert({
    where: { id: role.id },
    update: {},
    create: role,
  }),
);
