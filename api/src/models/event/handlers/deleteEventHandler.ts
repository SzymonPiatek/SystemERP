import { RequestHandler } from 'express';
import { returnError } from '@src/utils/error';
import prisma from '@src/prismaClient';

export const deleteEventHandler: RequestHandler = async (req, res): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const userId = Number(req.userId);

    const event = await prisma.event.findUnique({ where: { id: id, ownerId: userId } });
    if (!event) {
      res.status(404).json({ success: false, message: 'Event not found' });
      return;
    }

    await prisma.eventInvitation.deleteMany({ where: { eventId: id } });

    await prisma.event.delete({ where: { id: id } });

    res.status(200).json({ success: true, message: 'Event deleted successfully' });
    return;
  } catch (error) {
    returnError(res, error);
  }
};
