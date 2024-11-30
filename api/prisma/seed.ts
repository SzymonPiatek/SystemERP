import prisma from '../src/prismaClient';
import { createRoles } from '../src/fixtures/roles/createRoles';
import { createPermissions } from '../src/fixtures/permissions/createPermissions';
import { createPermissionRoles } from '../src/fixtures/permissionRoles/createPermissionRoles';
import { createAdminUserData } from '../src/fixtures/users/createAdminUserData';
import { createCompanies } from '../src/fixtures/companies/createCompanies';
import { createEvents } from '../src/fixtures/events/createEvents';
import { createNotes } from '../src/fixtures/notes/createNotes';

async function main() {
  // Creating roles, permissions, permissionRoles
  await Promise.all([...createRoles, ...createPermissions]);
  await createPermissionRoles();

  // Creating admin user
  const adminUserData = await createAdminUserData();
  await prisma.user.upsert({
    where: { email: adminUserData.email },
    update: {},
    create: adminUserData,
  });

  // Creating events
  await Promise.all([...createEvents]);

  // Creating notes
  await createNotes();

  // Creating companies
  await Promise.all([...createCompanies]);
}

main()
  .catch(() => {
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
