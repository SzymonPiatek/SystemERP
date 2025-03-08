import { RequestHandler } from 'express';
import { returnError } from '@src/utils/error';
import prisma from '@src/prismaClient';

export const deleteItemHandler: RequestHandler = async (req, res): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const userId = Number(req.userId);

    const item = await prisma.item.findUnique({ where: { id: id, itemId: userId } });
    if (!item) {
      res.status(404).json({ success: false, message: 'Item not found' });
      return;
    }

    await prisma.item.delete({ where: { id: id } });

    res.status(200).json({ success: true, message: 'Item deleted successfully' });
    return;
  } catch (error) {
    returnError(res, error);
  }
};
