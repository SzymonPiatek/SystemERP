import { RequestHandler } from 'express';
import { returnError } from '../../../utils/error';
import Joi from 'joi';
import prisma from '../../../prismaClient';

const eventSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().optional(),
  startDate: Joi.date().required(),
  endDate: Joi.date()
    .required()
    .custom((value, helpers) => {
      const { startDate } = helpers.state.ancestors[0];
      if (new Date(value) < new Date(startDate)) {
        return helpers.error('any.invalid', { message: '"endDate" must be greater than or equal to "startDate"' });
      }
      return value;
    }),
  ownerId: Joi.number().required(),
  isAllDay: Joi.boolean(),
});

export const createEventHandler: RequestHandler = async (req, res) => {
  try {
    const { error, value } = eventSchema.validate(req.body);
    if (error) {
      res.status(400).json({ success: false, message: error.details[0].message });
      return;
    }

    const { title, description, isAllDay, startDate, endDate, ownerId } = value;

    const userExists = await prisma.user.findUnique({
      where: { id: ownerId },
    });

    if (!userExists) {
      res.status(404).json({ success: false, message: 'Owner not found' });
      return;
    }

    const newEvent = await prisma.event.create({
      data: {
        title,
        description,
        isAllDay,
        startDate,
        endDate,
        ownerId,
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
