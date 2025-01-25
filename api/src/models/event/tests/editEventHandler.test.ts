import '@src/tests/mocks';
import { adminUser, eventData } from '@src/tests/data';
import prisma from '@src/prismaClient';
import request from 'supertest';
import app from '@src/app';

const baseUrl = (id: number) => {
  return `/api/v1/events/${id}`;
};

describe('editEventHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should return 404 - event not found', async () => {
    const mockedUser = adminUser;

    (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(mockedUser);
    (prisma.event.findUnique as jest.Mock).mockResolvedValue(null);

    const response = await request(app).patch(baseUrl(999999)).set('Authorization', 'Bearer mocktoken').send({
      title: 'Old title',
    });

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Event not found');
  });

  it('Should edit event', async () => {
    const mockedUser = adminUser;
    const mockedEvent = {
      ...eventData,
      ownerId: adminUser.id,
      title: 'Old title',
      startDate: eventData.startDate.toISOString(),
      endDate: eventData.endDate.toISOString(),
      createdAt: eventData.createdAt.toISOString(),
      updatedAt: eventData.updatedAt.toISOString(),
    };
    const updatedMockedEvent = {
      ...mockedEvent,
      title: 'New title',
    };

    (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(mockedUser);
    (prisma.event.findUnique as jest.Mock).mockResolvedValueOnce(mockedEvent);
    (prisma.event.update as jest.Mock).mockResolvedValueOnce(updatedMockedEvent);

    const response = await request(app).patch(baseUrl(mockedEvent.id)).set('Authorization', 'Bearer mocktoken').send({
      title: updatedMockedEvent.title,
    });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Event updated successfully');
    expect(response.body.event).toEqual(updatedMockedEvent);
  });

  it('Should return validation error', async () => {
    const mockedUser = adminUser;
    const mockedEvent = {
      ...eventData,
      ownerId: adminUser.id,
      title: 'Old title',
      startDate: eventData.startDate.toISOString(),
      endDate: eventData.endDate.toISOString(),
      createdAt: eventData.createdAt.toISOString(),
      updatedAt: eventData.updatedAt.toISOString(),
    };
    const updatedMockedEvent = {
      ...mockedEvent,
      title: 123,
    };

    (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(mockedUser);
    (prisma.event.findUnique as jest.Mock).mockResolvedValueOnce(mockedEvent);
    (prisma.event.update as jest.Mock).mockResolvedValueOnce(updatedMockedEvent);

    const response = await request(app).patch(baseUrl(mockedEvent.id)).set('Authorization', 'Bearer mocktoken').send({
      title: updatedMockedEvent.title,
    });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('"title" must be a string');
  });
});
