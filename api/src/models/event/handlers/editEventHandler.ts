import { RequestHandler } from 'express';
import { returnError } from '@src/utils/error';
import Joi from 'joi';
import prisma from '@src/prismaClient';

const eventSchema = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  startDate: Joi.date().optional(),
  endDate: Joi.date().optional(),
  isAllDay: Joi.boolean().optional(),
  invited: Joi.array().items(Joi.number()).optional(),
});

export const editEventHandler: RequestHandler = async (req, res): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const userId = Number(req.userId);

    const { error, value } = eventSchema.validate(req.body);
    if (error) {
      res.status(400).json({ success: false, message: error.details[0].message });
      return;
    }

    const isExist = await prisma.event.findUnique({ where: { id: id, ownerId: userId } });
    if (!isExist) {
      res.status(404).json({ success: false, message: 'Event not found' });
      return;
    }

    const { title, description, startDate, endDate, isAllDay, invited } = value;

    const updatedData: {
      title?: string;
      description?: string;
      startDate?: string;
      endDate?: string;
      isAllDay?: boolean;
    } = {};

    if (title) updatedData.title = title;
    if (description) updatedData.description = description;
    if (startDate) updatedData.startDate = startDate;
    if (endDate) updatedData.endDate = endDate;
    if (isAllDay) updatedData.isAllDay = isAllDay;

    const updatedEvent = await prisma.event.update({
      where: { id: id },
      data: updatedData,
    });

    if (invited && Array.isArray(invited)) {
      const currentInvitations = await prisma.eventInvitation.findMany({
        where: { eventId: id },
        select: { userId: true },
      });

      const currentInvitedIds = currentInvitations.map((inv) => inv.userId);

      const toRemove = currentInvitedIds.filter((userId) => !invited.includes(userId));

      const toAdd = invited.filter((userId) => !currentInvitedIds.includes(userId));

      if (toRemove.length > 0) {
        await prisma.eventInvitation.deleteMany({
          where: {
            eventId: id,
            userId: { in: toRemove },
          },
        });
      }

      if (toAdd.length > 0) {
        const validUsers = await prisma.user.findMany({
          where: { id: { in: toAdd } },
        });

        const newInvitations = validUsers.map((user) => ({
          eventId: id,
          userId: user.id,
        }));

        await prisma.eventInvitation.createMany({
          data: newInvitations,
        });
      }
    }

    const updatedInvitations = await prisma.eventInvitation.findMany({
      where: { eventId: id },
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

    res.status(200).json({
      success: true,
      message: 'Event updated successfully',
      event: {
        ...updatedEvent,
        invitations: updatedInvitations.map((inv) => ({
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
