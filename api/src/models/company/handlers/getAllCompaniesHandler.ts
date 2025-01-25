import { RequestHandler } from 'express';
import { addTextCondition } from '@src/utils/queryConditions';
import prisma from '@src/prismaClient';
import paginateData from '@src/utils/pagination';
import { returnError } from '@src/utils/error';

export const getAllCompaniesHandler: RequestHandler = async (req, res): Promise<void> => {
  try {
    const { name, country, voivodeship, district, commune, city, zipCode, street, houseNumber, apartmentNumber, nip, regon, search } =
      req.query;

    const queryConditions: Record<string, any> = {};

    const conditionsList: any[][] = [
      ['name', name],
      ['country', country],
      ['voivodeship', voivodeship],
      ['district', district],
      ['commune', commune],
      ['city', city],
      ['country', country],
      ['zipCode', zipCode],
      ['street', street],
      ['houseNumber', houseNumber],
      ['apartmentNumber', apartmentNumber],
      ['nip', nip],
      ['regon', regon],
    ];

    for (const condition of conditionsList) {
      addTextCondition(queryConditions, condition[0], condition[1] as string | string[] | undefined);
    }

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
    return;
  } catch (error) {
    returnError(res, error);
  }
};
