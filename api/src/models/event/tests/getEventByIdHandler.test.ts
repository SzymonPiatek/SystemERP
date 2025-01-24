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

  it('Should return event', async () => {
    const mockedUser = adminUser;
    const newEvent = {
      ...eventData,
      ownerId: adminUser.id,
      startDate: eventData.startDate.toISOString(),
      endDate: eventData.endDate.toISOString(),
      createdAt: mockedUser.createdAt.toISOString(),
      updatedAt: mockedUser.updatedAt.toISOString(),
    };

    (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(mockedUser);
    (prisma.event.findUnique as jest.Mock).mockResolvedValueOnce(newEvent);

    const response = await request(app).get(baseUrl(newEvent.id)).set('Authorization', 'Bearer mocktoken');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.event).toEqual(newEvent);
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
});
