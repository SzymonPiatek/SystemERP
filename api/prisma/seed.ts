import prisma from '../src/prismaClient';
import { createRoles } from '../src/fixtures/roles/createRoles';
import { createPermissions } from '../src/fixtures/permissions/createPermissions';
import { createPermissionRoles } from '../src/fixtures/permissionRoles/createPermissionRoles';
import { createCompanies } from '../src/fixtures/companies/createCompanies';
import { createEvents } from '../src/fixtures/events/createEvents';
import { createNotes } from '../src/fixtures/notes/createNotes';
import { createAdminUserData } from '../src/fixtures/users/createAdminUser';

async function main() {
  await createRoles();
  await createPermissions();
  await createPermissionRoles();

  const adminUserData = await createAdminUserData();
  await prisma.user.upsert({
    where: { email: adminUserData.email },
    update: {},
    create: adminUserData,
  });

  await createEvents();
  await createNotes();
  await createCompanies();
}

main()
  .catch(() => {
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
