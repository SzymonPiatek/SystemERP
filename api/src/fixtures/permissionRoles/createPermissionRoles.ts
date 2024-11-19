import prisma from '../../prismaClient';
import { permissionRolesData } from './permissionRolesData';

export const createPermissionRoles = async () => {
  const tasks = Object.entries(permissionRolesData).flatMap(([roleName, permissionNames]) =>
    permissionNames.map(async (permissionName) => {
      const role = await prisma.role.findUnique({ where: { name: roleName } });
      const permission = await prisma.permission.findUnique({ where: { name: permissionName } });

      if (role && permission) {
        await prisma.permissionRole.upsert({
          where: {
            permissionId_roleId: {
              permissionId: permission.id,
              roleId: role.id,
            },
          },
          update: {},
          create: {
            permissionId: permission.id,
            roleId: role.id,
          },
        });
      }
    }),
  );

  await Promise.all(tasks);
};
