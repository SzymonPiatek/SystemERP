import { RequestHandler } from 'express';
import { returnError } from '../../../utils/error';
import prisma from '../../../prismaClient';

export const getAllCompaniesHandler: RequestHandler = async (req, res): Promise<void> => {
  try {
    const companies = await prisma.company.findMany();
    const countCompanies = companies.length;

    res.status(200).json({ success: true, count: countCompanies, companies });
  } catch (error) {
    returnError(res, error);
  }
};

export const getCompanyByIdHandler: RequestHandler = async (req, res): Promise<void> => {
  try {
    const company = await prisma.company.findUnique({ where: { id: Number(req.params.id) } });

    if (company) {
      res.status(200).json({ success: true, message: 'Company found', company });
    } else {
      res.status(404).json({ success: false, message: 'Company not found' });
    }
  } catch (error) {
    returnError(res, error);
  }
};
