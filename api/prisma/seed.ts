import prisma from '../src/prismaClient';
import { createRoles } from '../src/fixtures/roles/createRoles';
import { createPermissions } from '../src/fixtures/permissions/createPermissions';
import { createPermissionRoles } from '../src/fixtures/permissionRoles/createPermissionRoles';
import { createCompanies } from '../src/fixtures/companies/createCompanies';
import { createEvents } from '../src/fixtures/events/createEvents';
import { createNotes } from '../src/fixtures/notes/createNotes';
import { createUsers } from '../src/fixtures/users/createUsers';

async function main() {
  await createRoles();
  await createPermissions();
  await createPermissionRoles();
  await createUsers();
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
