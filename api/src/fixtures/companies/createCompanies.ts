import prisma from '../../prismaClient';
import { companiesData } from './companiesData';

export const createCompanies = async () => {
  const companyMap: Record<string, number> = {};

  for (const company of companiesData) {
    const createdCompany = await prisma.company.upsert({
      where: { name: company.name },
      update: { ...company },
      create: company,
    });

    companyMap[company.name] = createdCompany.id;
  }

  return companyMap;
};
