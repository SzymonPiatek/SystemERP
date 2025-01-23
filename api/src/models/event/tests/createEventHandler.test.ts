import '@src/tests/mocks';
import { adminUser, eventData } from '@src/tests/data';
import prisma from '@src/prismaClient';
import request from 'supertest';
import app from '@src/app';

const baseUrl = '/api/v1/events';

describe('CreateEventHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should create a new event', async () => {
    const mockedUser = adminUser;
    const newEvent = {
      ...eventData,
      ownerId: mockedUser.id,
      startDate: eventData.startDate.toISOString(),
      endDate: eventData.endDate.toISOString(),
      createdAt: eventData.createdAt.toISOString(),
      updatedAt: eventData.updatedAt.toISOString(),
    };

    (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(mockedUser);
    (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(mockedUser);
    (prisma.event.create as jest.Mock).mockResolvedValueOnce(newEvent);

    const response = await request(app)
      .post(baseUrl)
      .set('Authorization', 'Bearer mocktoken')
      .send({ ...newEvent, id: undefined, createdAt: undefined, updatedAt: undefined });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Event created');
    expect(response.body.event).toEqual(newEvent);
  });

  it('Should return validation error', async () => {
    const mockedUser = adminUser;
    const newEvent = {
      ...eventData,
      ownerId: 'abc',
      startDate: eventData.startDate.toISOString(),
      endDate: eventData.endDate.toISOString(),
      createdAt: eventData.createdAt.toISOString(),
      updatedAt: eventData.updatedAt.toISOString(),
    };

    (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(mockedUser);
    (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(mockedUser);
    (prisma.event.create as jest.Mock).mockResolvedValueOnce(newEvent);

    const response = await request(app)
      .post(baseUrl)
      .set('Authorization', 'Bearer mocktoken')
      .send({ ...newEvent, id: undefined, createdAt: undefined, updatedAt: undefined });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('"ownerId" must be a number');
  });
});
