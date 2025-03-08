import { RequestHandler } from 'express';
import { returnError } from '@src/utils/error';
import prisma from '@src/prismaClient';

export const getItemByIdHandler: RequestHandler = async (req, res): Promise<void> => {
  try {
    const userId = Number(req.userId);
    const itemId = Number(req.params.id);

    const currentUser = await prisma.user.findUnique({
      where: { id: userId },
      include: { profile: { include: { role: true } } },
    });

    if (!currentUser) {
      res.status(403).json({ success: false, message: 'Access denied' });
      return;
    } else if (currentUser?.profile?.role.name !== 'ADMIN') {
      if (currentUser.itemId !== itemId) {
        res.status(403).json({ success: false, message: 'Access denied' });
        return;
      }
    }

    const item = await prisma.item.findUnique({ where: { id: itemId } });

    if (item) {
      res.status(200).json({ success: true, message: 'Item found', item });
      return;
    } else {
      res.status(404).json({ success: false, message: 'Item not found' });
      return;
    }
  } catch (error) {
    returnError(res, error);
  }
};
