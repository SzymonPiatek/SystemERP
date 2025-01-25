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

  it('Should create a new event without invitations', async () => {
    const mockedUser = adminUser;
    const newEvent = {
      ...eventData,
      ownerId: mockedUser.id,
      startDate: eventData.startDate.toISOString(),
      endDate: eventData.endDate.toISOString(),
      createdAt: eventData.createdAt.toISOString(),
      updatedAt: eventData.updatedAt.toISOString(),
    };

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockedUser);
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockedUser);
    (prisma.event.create as jest.Mock).mockResolvedValue(newEvent);

    const response = await request(app)
      .post(baseUrl)
      .set('Authorization', 'Bearer mocktoken')
      .send({ ...newEvent, id: undefined, invited: undefined, createdAt: undefined, updatedAt: undefined });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Event created');
    expect(response.body.event).toEqual({ ...newEvent, invitations: [] });
    expect(response.body.event.invitations).toEqual([]);
  });

  it('Should create a new event with invitations', async () => {
    const mockedUser = adminUser;
    const mockedUsers = [
      { id: 2, email: 'user2@example.com', firstName: 'User', lastName: 'Two' },
      { id: 3, email: 'user3@example.com', firstName: 'User', lastName: 'Three' },
    ];
    const newEvent = {
      ...eventData,
      ownerId: mockedUser.id,
      startDate: eventData.startDate.toISOString(),
      endDate: eventData.endDate.toISOString(),
      createdAt: eventData.createdAt.toISOString(),
      updatedAt: eventData.updatedAt.toISOString(),
    };

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockedUser);
    (prisma.user.findMany as jest.Mock).mockResolvedValue(mockedUsers);
    (prisma.event.create as jest.Mock).mockResolvedValue({ ...newEvent, id: 1 });
    (prisma.eventInvitation.createMany as jest.Mock).mockResolvedValue(undefined);
    (prisma.eventInvitation.findMany as jest.Mock).mockResolvedValue(
      mockedUsers.map((user) => ({
        userId: user.id,
        user,
      })),
    );

    const response = await request(app)
      .post(baseUrl)
      .set('Authorization', 'Bearer mocktoken')
      .send({
        ...newEvent,
        id: undefined,
        createdAt: undefined,
        updatedAt: undefined,
        invited: [2, 3],
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Event created');
    expect(response.body.event.invitations).toHaveLength(mockedUsers.length);
    expect(response.body.event.invitations[0].user.email).toBe('user2@example.com');
    expect(response.body.event.invitations[1].user.email).toBe('user3@example.com');
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
