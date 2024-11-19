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

export const getUserByIdHandler: RequestHandler = async (req, res): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({ where: { id: Number(req.params.id) } });

    if (user) {
      res.status(200).json({ success: true, message: 'User found', user });
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    returnError(res, error);
  }
};
