import { RequestHandler } from 'express';
import { returnError } from '@src/utils/error';
import Joi from 'joi';
import prisma from '@src/prismaClient';
import { EventInvitation } from '@src/types/types';

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
  invited: Joi.array().items(Joi.number()).optional(),
});

export const createEventHandler: RequestHandler = async (req, res) => {
  try {
    const { error, value } = eventSchema.validate(req.body);
    if (error) {
      res.status(400).json({ success: false, message: error.details[0].message });
      return;
    }

    const { title, description, isAllDay, startDate, endDate, ownerId, invited } = value;

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

    let eventInvitations: EventInvitation[] = [];
    if (invited && invited.length > 0) {
      const validInvites = await prisma.user.findMany({
        where: {
          id: {
            in: invited,
          },
        },
      });

      const eventInvitationsData = validInvites.map((user) => ({
        eventId: newEvent.id,
        userId: user.id,
      }));

      await prisma.eventInvitation.createMany({
        data: eventInvitationsData,
      });

      eventInvitations = await prisma.eventInvitation.findMany({
        where: { eventId: newEvent.id },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      });
    }

    res.status(201).json({
      success: true,
      message: 'Event created',
      event: {
        ...newEvent,
        invitations: eventInvitations.map((inv) => ({
          userId: inv.userId,
          user: inv.user,
        })),
      },
    });
    return;
  } catch (error) {
    returnError(res, error);
  }
};
