import { RequestHandler } from 'express';
import { returnError } from '../../../utils/error';
import prisma from '../../../prismaClient';

export const getAllEventsHandler: RequestHandler = async (req, res) => {
  try {
    const events = await prisma.event.findMany();
    const countEvents = events.length;

    res.status(200).json({ success: true, count: countEvents, events });
  } catch (error) {
    returnError(res, error);
  }
};

export const getEventByIdHandler: RequestHandler = async (req, res) => {
  try {
    const event = await prisma.event.findUnique({ where: { id: Number(req.params.id) } });

    if (event) {
      res.status(200).json({ success: true, event });
    } else {
      res.status(404).json({ success: false, message: 'Event not found' });
    }
  } catch (error) {
    returnError(res, error);
  }
};
