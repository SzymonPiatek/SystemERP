import prisma from '../src/prismaClient';
import { createRoles } from '../src/fixtures/roles/createRoles';
import { createPermissions } from '../src/fixtures/permissions/createPermissions';
import { createPermissionRoles } from '../src/fixtures/permissionRoles/createPermissionRoles';

async function main() {
  await Promise.all([...createRoles, ...createPermissions]);
  await createPermissionRoles();
}

main()
  .catch(() => {
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
