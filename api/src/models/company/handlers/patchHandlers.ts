import { RequestHandler } from 'express';
import { returnError } from '../../../utils/error';
import prisma from '../../../prismaClient';
import Joi from 'joi';

const companySchema = Joi.object({
  name: Joi.string().optional(),
  country: Joi.string().optional(),
  voivodeship: Joi.string().optional(),
  district: Joi.string().optional(),
  commune: Joi.string().optional(),
  city: Joi.string().optional(),
  zipCode: Joi.string().optional(),
  street: Joi.string().optional(),
  houseNumber: Joi.string().optional(),
  apartmentNumber: Joi.string().optional(),
  nip: Joi.string().optional(),
  regon: Joi.string().optional(),
});

export const editCompanyDataHandler: RequestHandler = async (req, res): Promise<void> => {
  const { id } = req.params;

  if (!Object.keys(req.body).length) {
    res.status(400).json({ success: false, message: 'Request body cannot be empty' });
    return;
  }

  if (!Object.keys(req.body).length) {
    res.status(400).json({ success: false, message: 'Request body cannot be empty' });
    return;
  }

  try {
    const { error, value } = companySchema.validate(req.body);
    if (error) {
      res.status(400).json({ success: false, message: error.details[0].message });
      return;
    }

    const company = await prisma.company.findUnique({ where: { id: Number(id) } });
    if (!company) {
      res.status(404).json({ success: false, message: 'Company not found' });
      return;
    }

    const { name, country, voivodeship, district, commune, city, zipCode, street, houseNumber, apartmentNumber, nip, regon } = value;

    if (name) {
      const existingCompany = await prisma.company.findFirst({
        where: {
          name,
          id: { not: Number(id) },
        },
      });
      if (existingCompany) {
        res.status(400).json({ success: false, message: 'A company with this name already exists' });
        return;
      }
    }

    const updatedData: {
      name?: string;
      country?: string;
      voivodeship?: string;
      district?: string;
      commune?: string;
      city?: string;
      zipCode?: string;
      street?: string;
      houseNumber?: string;
      apartmentNumber?: string;
      nip?: string;
      regon?: string;
    } = {};
    if (name) updatedData.name = name;
    if (country) updatedData.country = country;
    if (voivodeship) updatedData.voivodeship = voivodeship;
    if (district) updatedData.district = district;
    if (commune) updatedData.commune = commune;
    if (city) updatedData.city = city;
    if (zipCode) updatedData.zipCode = zipCode;
    if (street) updatedData.street = street;
    if (houseNumber) updatedData.houseNumber = houseNumber;
    if (apartmentNumber) updatedData.apartmentNumber = apartmentNumber;
    if (nip) updatedData.nip = nip;
    if (regon) updatedData.regon = regon;

    const updatedCompany = await prisma.company.update({
      where: { id: Number(id) },
      data: updatedData,
    });

    res.status(200).json({ success: true, message: 'Company updated successfully', company: updatedCompany });
  } catch (error) {
    returnError(res, error);
  }
};
