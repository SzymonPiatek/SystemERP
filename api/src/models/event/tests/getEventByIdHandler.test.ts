import '@src/tests/mocks';
import { adminUser, eventData } from '@src/tests/data';
import prisma from '@src/prismaClient';
import request from 'supertest';
import app from '@src/app';

const baseUrl = (id: number) => {
  return `/api/v1/events/${id}`;
};

describe('getEventByIdHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should return 404 - event not found', async () => {
    const mockedUser = adminUser;

    (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(mockedUser);
    (prisma.event.findUnique as jest.Mock).mockResolvedValueOnce(null);

    const response = await request(app).get(baseUrl(999999)).set('Authorization', 'Bearer mocktoken');

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Event not found');
  });

  it('Should return 404 if user is not the owner or invited', async () => {
    const mockedUser = adminUser;
    const mockedEvent = {
      ...eventData,
      ownerId: 2,
    };

    (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(mockedUser);
    (prisma.event.findUnique as jest.Mock).mockResolvedValueOnce(mockedEvent);
    (prisma.eventInvitation.findFirst as jest.Mock).mockResolvedValueOnce(null);

    const response = await request(app).get(baseUrl(mockedEvent.id)).set('Authorization', 'Bearer mocktoken');

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Event not found');
  });

  it('Should return event if user is invited', async () => {
    const mockedUser = adminUser;
    const mockedEvent = {
      ...eventData,
      ownerId: 2,
      owner: {
        id: 2,
        email: 'owner@example.com',
        firstName: 'Owner',
        lastName: 'User',
      },
      startDate: eventData.startDate.toISOString(),
      endDate: eventData.endDate.toISOString(),
      createdAt: eventData.createdAt.toISOString(),
      updatedAt: eventData.updatedAt.toISOString(),
      invitations: [
        {
          userId: adminUser.id,
          user: {
            id: adminUser.id,
            email: adminUser.email,
            firstName: adminUser.firstName,
            lastName: adminUser.lastName,
          },
        },
      ],
    };

    const mockedInvitation = {
      eventId: mockedEvent.id,
      userId: adminUser.id,
      event: mockedEvent,
    };

    (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(mockedUser);
    (prisma.event.findUnique as jest.Mock).mockResolvedValueOnce(mockedEvent);
    (prisma.eventInvitation.findFirst as jest.Mock).mockResolvedValueOnce(mockedInvitation);

    const response = await request(app).get(baseUrl(mockedEvent.id)).set('Authorization', 'Bearer mocktoken');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.event).toEqual(mockedEvent);
  });
});
