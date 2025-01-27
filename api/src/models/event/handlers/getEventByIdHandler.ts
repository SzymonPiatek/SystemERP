import { RequestHandler } from 'express';
import { returnError } from '@src/utils/error';
import prisma from '@src/prismaClient';

export const getEventByIdHandler: RequestHandler = async (req, res) => {
  try {
    const userId = Number(req.userId);
    const eventId = Number(req.params.id);

    let event = await prisma.event.findUnique({
      where: { id: eventId },
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
    });

    if (event && event.ownerId !== userId) {
      const invitation = await prisma.eventInvitation.findFirst({
        where: {
          eventId: eventId,
          userId: userId,
        },
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

      if (invitation) {
        event = invitation.event;
      } else {
        event = null;
      }
    }

    if (event) {
      res.status(200).json({
        success: true,
        event,
      });
      return;
    } else {
      res.status(404).json({
        success: false,
        message: 'Event not found',
      });
      return;
    }
  } catch (error) {
    returnError(res, error);
  }
};
