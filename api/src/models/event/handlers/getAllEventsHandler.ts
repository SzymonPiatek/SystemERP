import { RequestHandler } from 'express';
import prisma from '@src/prismaClient';
import { returnError } from '@src/utils/error';

export const getAllEventsHandler: RequestHandler = async (req, res) => {
  try {
    const userId = Number(req.userId);

    const ownedEvents = await prisma.event.findMany({
      where: { ownerId: userId },
      include: {
        invitations: {
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
        },
      },
    });

    const invitedEvents = await prisma.eventInvitation.findMany({
      where: { userId: userId },
      include: {
        event: {
          include: {
            owner: {
              select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
              },
            },
            invitations: {
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
            },
          },
        },
      },
    });

    const transformedInvitedEvents = invitedEvents.map((inv) => inv.event);
    const allEvents = [...ownedEvents, ...transformedInvitedEvents];

    res.status(200).json({ success: true, count: allEvents.length, events: allEvents });
    return;
  } catch (error) {
    returnError(res, error);
  }
};
