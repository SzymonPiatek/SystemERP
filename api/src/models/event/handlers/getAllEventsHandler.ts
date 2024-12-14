import { RequestHandler } from 'express';
import prisma from '../../../prismaClient';
import { returnError } from '../../../utils/error';

export const getAllEventsHandler: RequestHandler = async (req, res) => {
  try {
    const userId = Number(req.userId);

    const events = await prisma.event.findMany({ where: { id: userId } });
    const countEvents = events.length;

    res.status(200).json({ success: true, count: countEvents, events });
    return;
  } catch (error) {
    returnError(res, error);
  }
};
