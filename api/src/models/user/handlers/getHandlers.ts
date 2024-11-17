import { RequestHandler } from 'express';
import { returnError } from '../../../utils/error';
import prisma from '../../../prismaClient';

export const getAllUsersHandler: RequestHandler = async (req, res): Promise<void> => {
  try {
    const users = await prisma.user.findMany();
    const countUsers = users.length;

    res.status(200).json({ success: true, count: countUsers, users });
  } catch (error) {
    returnError(res, error);
  }
};
