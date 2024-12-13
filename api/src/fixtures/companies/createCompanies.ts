import prisma from '../../prismaClient';
import { companiesData } from './companiesData';

export const createCompanies = async () => {
  const upsertPromises = companiesData.map((company) =>
    prisma.company.upsert({
      where: { name: company.name },
      update: {},
      create: company,
    }),
  );

  await Promise.all(upsertPromises);
};
