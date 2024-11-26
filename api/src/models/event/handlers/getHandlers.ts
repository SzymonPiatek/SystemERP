import { RequestHandler } from 'express';
import prisma from '../../../prismaClient';
import { returnError } from '../../../utils/error';

export const getAllEventsHandler: RequestHandler = async (req, res) => {
  try {
    const events = await prisma.event.findMany();
    const countEvents = events.length;

    res.status(200).json({ success: true, count: countEvents, events });
  } catch (error) {
    returnError(res, error);
  }
};
