import { RequestHandler } from 'express';
import { returnError } from '../../../utils/error';
import prisma from '../../../prismaClient';
import { excludePassword } from '../services/returnSafeUserData';

export const getUserByIdHandler: RequestHandler = async (req, res): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(req.params.id) },
      include: {
        profile: {
          include: {
            role: true,
          },
        },
      },
    });

    if (user) {
      const safeData = excludePassword(user);
      res.status(200).json({ success: true, message: 'User found', user: safeData });
      return;
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }
  } catch (error) {
    returnError(res, error);
  }
};
