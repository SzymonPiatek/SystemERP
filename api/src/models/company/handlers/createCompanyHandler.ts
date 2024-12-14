import { RequestHandler } from 'express';
import { returnError } from '../../../utils/error';
import Joi from 'joi';
import prisma from '../../../prismaClient';

const companySchema = Joi.object({
  name: Joi.string().required(),
  country: Joi.string().required(),
  voivodeship: Joi.string().required(),
  district: Joi.string().required(),
  commune: Joi.string().required(),
  city: Joi.string().required(),
  zipCode: Joi.string().required(),
  street: Joi.string().required(),
  houseNumber: Joi.string().required(),
  apartmentNumber: Joi.string().required(),
  nip: Joi.string().required(),
  regon: Joi.string().required(),
});

export const createCompanyHandler: RequestHandler = async (req, res): Promise<void> => {
  try {
    const { error, value } = companySchema.validate(req.body);
    if (error) {
      res.status(400).json({ success: false, message: error.details[0].message });
      return;
    }

    const { name, country, voivodeship, district, commune, city, zipCode, street, houseNumber, apartmentNumber, nip, regon } = value;

    const isNameExist = await prisma.company.findFirst({
      where: { name: name },
    });

    if (isNameExist) {
      res.status(400).json({ success: false, message: 'Name already exists' });
      return;
    }

    const newCompany = await prisma.company.create({
      data: {
        name,
        country,
        voivodeship,
        district,
        commune,
        city,
        zipCode,
        street,
        houseNumber,
        apartmentNumber,
        nip,
        regon,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Company created',
      company: newCompany,
    });
  } catch (error) {
    returnError(res, error);
  }
};
