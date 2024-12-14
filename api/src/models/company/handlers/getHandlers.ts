import { RequestHandler } from 'express';
import { returnError } from '../../../utils/error';
import prisma from '../../../prismaClient';
import { addTextCondition } from '../../../utils/queryConditions';
import paginateData from '../../../utils/pagination';

export const getAllCompaniesHandler: RequestHandler = async (req, res): Promise<void> => {
  try {
    const { name, country, voivodeship, district, commune, city, zipCode, street, houseNumber, apartmentNumber, nip, regon, search } =
      req.query;

    const queryConditions: Record<string, any> = {};

    addTextCondition(queryConditions, 'name', name as string | string[] | undefined);
    addTextCondition(queryConditions, 'country', country as string | string[] | undefined);
    addTextCondition(queryConditions, 'voivodeship', voivodeship as string | string[] | undefined);
    addTextCondition(queryConditions, 'district', district as string | string[] | undefined);
    addTextCondition(queryConditions, 'commune', commune as string | string[] | undefined);
    addTextCondition(queryConditions, 'city', city as string | string[] | undefined);
    addTextCondition(queryConditions, 'zipCode', zipCode as string | string[] | undefined);
    addTextCondition(queryConditions, 'street', street as string | string[] | undefined);
    addTextCondition(queryConditions, 'houseNumber', houseNumber as string | string[] | undefined);
    addTextCondition(queryConditions, 'apartmentNumber', apartmentNumber as string | string[] | undefined);
    addTextCondition(queryConditions, 'nip', nip as string | string[] | undefined);
    addTextCondition(queryConditions, 'regon', regon as string | string[] | undefined);

    if (search) {
      const searchWords = search.toString().trim().split(/\s+/);
      queryConditions.OR = searchWords.flatMap((word) => [
        { name: { contains: word, mode: 'insensitive' } },
        { country: { contains: word, mode: 'insensitive' } },
        { voivodeship: { contains: word, mode: 'insensitive' } },
        { district: { contains: word, mode: 'insensitive' } },
        { commune: { contains: word, mode: 'insensitive' } },
        { city: { contains: word, mode: 'insensitive' } },
        { zipCode: { contains: word, mode: 'insensitive' } },
        { street: { contains: word, mode: 'insensitive' } },
        { houseNumber: { contains: word, mode: 'insensitive' } },
        { apartmentNumber: { contains: word, mode: 'insensitive' } },
        { nip: { contains: word, mode: 'insensitive' } },
        { regon: { contains: word, mode: 'insensitive' } },
      ]);
    }

    const limit = parseInt(req.query.limit as string, 10) || 10;
    const page = parseInt(req.query.page as string, 10) || 1;

    const total = await prisma.company.count({
      where: queryConditions,
    });
    const companies = await prisma.company.findMany({
      where: queryConditions,
      skip: (page - 1) * limit,
      take: limit,
    });

    const paginatedResponse = paginateData(companies, limit, page, total);

    res.status(200).json({
      success: true,
      ...paginatedResponse,
      total,
    });
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
