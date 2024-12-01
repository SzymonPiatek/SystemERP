import { RequestHandler } from 'express';
import { returnError } from '../../../utils/error';
import prisma from '../../../prismaClient';

export const editCompanyHandler: RequestHandler = async (req, res): Promise<void> => {
  const { name, country, voivodeship, district, commune, city, zipCode, street, houseNumber, apartmentNumber, nip, regon } = req.body;
  const { id } = req.params;

  try {
    const company = await prisma.company.findUnique({ where: { id: Number(id) } });
    if (!company) {
      res.status(404).json({ success: false, message: 'Company not found' });
      return;
    }

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
