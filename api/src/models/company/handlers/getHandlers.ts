import { RequestHandler } from 'express';
import { returnError } from '../../../utils/error';
import prisma from '../../../prismaClient';

export const getAllCompaniesHandler: RequestHandler = async (req, res): Promise<void> => {
  try {
    const { name, country, voivodeship, district, commune, city, zipCode, street, houseNumber, apartmentNumber, nip, regon, search } =
      req.query;

    const queryConditions: Record<string, any> = {};
    if (name !== undefined) {
      queryConditions.name = { contains: name, mode: 'insensitive' };
    }
    if (country !== undefined) {
      queryConditions.country = { contains: country, mode: 'insensitive' };
    }
    if (voivodeship !== undefined) {
      queryConditions.voivodeship = { contains: voivodeship, mode: 'insensitive' };
    }
    if (district !== undefined) {
      queryConditions.district = { contains: district, mode: 'insensitive' };
    }
    if (commune !== undefined) {
      queryConditions.commune = { contains: commune, mode: 'insensitive' };
    }
    if (city !== undefined) {
      queryConditions.city = { contains: city, mode: 'insensitive' };
    }
    if (zipCode !== undefined) {
      queryConditions.zipCode = { contains: zipCode, mode: 'insensitive' };
    }
    if (street !== undefined) {
      queryConditions.street = { contains: street, mode: 'insensitive' };
    }
    if (houseNumber !== undefined) {
      queryConditions.houseNumber = { contains: houseNumber, mode: 'insensitive' };
    }
    if (apartmentNumber !== undefined) {
      queryConditions.apartmentNumber = { contains: apartmentNumber, mode: 'insensitive' };
    }
    if (nip !== undefined) {
      queryConditions.nip = { contains: nip, mode: 'insensitive' };
    }
    if (regon !== undefined) {
      queryConditions.regon = { contains: regon, mode: 'insensitive' };
    }

    if (search !== undefined) {
      const searchText = search as string;

      queryConditions.OR = [
        { name: { contains: searchText, mode: 'insensitive' } },
        { country: { contains: searchText, mode: 'insensitive' } },
        { voivodeship: { contains: searchText, mode: 'insensitive' } },
        { district: { contains: searchText, mode: 'insensitive' } },
        { commune: { contains: searchText, mode: 'insensitive' } },
        { city: { contains: searchText, mode: 'insensitive' } },
        { zipCode: { contains: searchText, mode: 'insensitive' } },
        { street: { contains: searchText, mode: 'insensitive' } },
        { houseNumber: { contains: searchText, mode: 'insensitive' } },
        { apartmentNumber: { contains: searchText, mode: 'insensitive' } },
        { nip: { contains: searchText, mode: 'insensitive' } },
        { regon: { contains: searchText, mode: 'insensitive' } },
      ];
    }

    const companies = await prisma.company.findMany({
      where: queryConditions,
    });
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
