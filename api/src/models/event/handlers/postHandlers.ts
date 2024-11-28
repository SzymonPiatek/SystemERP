import { RequestHandler } from 'express';
import { returnError } from '../../../utils/error';
import Joi from 'joi';
import prisma from '../../../prismaClient';

const eventSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  date: Joi.date().required(),
  location: Joi.string().required(),
  organizer: Joi.string().required(),
});

export const postEventHandler: RequestHandler = async (req, res) => {
  try {
    const { error, value } = eventSchema.validate(req.body);
    if (error) {
      res.status(400).json({ success: false, message: error.details[0].message });
      return;
    }

    const { title, isAllDay, startDate, endDate, ownerId, owner } = value;

    const newEvent = await prisma.event.create({
      data: {
        title,
        isAllDay,
        startDate,
        endDate,
        ownerId,
        owner,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Event created',
      event: newEvent,
    });
  } catch (error) {
    returnError(res, error);
  }
};
