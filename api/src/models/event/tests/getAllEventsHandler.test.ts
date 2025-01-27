import '@src/tests/mocks';
import { adminUser, eventData } from '@src/tests/data';
import prisma from '@src/prismaClient';
import request from 'supertest';
import app from '@src/app';

const baseUrl = '/api/v1/events';

describe('getEventByIdHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should return events', async () => {
    const mockedUser = adminUser;
    const newEvent = {
      ...eventData,
      ownerId: adminUser.id,
      startDate: eventData.startDate.toISOString(),
      endDate: eventData.endDate.toISOString(),
      createdAt: mockedUser.createdAt.toISOString(),
      updatedAt: mockedUser.updatedAt.toISOString(),
    };
    const mockedEvents = [
      { ...newEvent, id: 1 },
      { ...newEvent, id: 2 },
      { ...newEvent, id: 3 },
    ];
    const mockedEventInvitations: any = [];
    const allEvents = [...mockedEvents, ...mockedEventInvitations];

    (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(mockedUser);
    (prisma.event.findMany as jest.Mock).mockResolvedValue(mockedEvents);
    (prisma.eventInvitation.findMany as jest.Mock).mockResolvedValue(mockedEventInvitations);

    const response = await request(app).get(baseUrl).set('Authorization', 'Bearer mocktoken');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.events).toEqual(allEvents);
    expect(response.body.count).toEqual(allEvents.length);
  });
});
