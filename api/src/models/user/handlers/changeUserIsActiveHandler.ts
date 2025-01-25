import { RequestHandler } from 'express';
import prisma from '@src/prismaClient';
import { returnError } from '@src/utils/error';
import { excludePassword } from '../services/returnSafeUserData';

export const changeUserIsActiveHandler: RequestHandler = async (req, res): Promise<void> => {
  try {
    const id = Number(req.params.id);

    const user = await prisma.user.findUnique({ where: { id: id } });
    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: {
        isActive: !user.isActive,
      },
    });

    const safeData = excludePassword(updatedUser);

    const message = safeData.isActive ? 'User activated successfully' : 'User deactivated successfully';

    res.status(200).json({ success: true, message: message, user: safeData });
    return;
  } catch (error) {
    returnError(res, error);
  }
};
