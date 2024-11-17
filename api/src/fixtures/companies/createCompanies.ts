import prisma from '../../prismaClient';
import { companiesData } from './companiesData';

export const createCompanies = companiesData.map((company) =>
  prisma.company.upsert({
    where: { name: company.name },
    update: {},
    create: company,
  }),
);
