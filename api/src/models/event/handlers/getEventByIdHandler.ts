import { RequestHandler } from 'express';
import { returnError } from '@src/utils/error';
import prisma from '@src/prismaClient';

export const getEventByIdHandler: RequestHandler = async (req, res) => {
  try {
    const userId = Number(req.userId);

    const event = await prisma.event.findUnique({ where: { id: Number(req.params.id), ownerId: userId } });

    if (event) {
      res.status(200).json({ success: true, event });
      return;
    } else {
      res.status(404).json({ success: false, message: 'Event not found' });
      return;
    }
  } catch (error) {
    returnError(res, error);
  }
};
