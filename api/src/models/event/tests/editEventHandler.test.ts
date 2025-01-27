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
    const mockedUsers = [
      { id: 2, email: 'user2@example.com', firstName: 'User', lastName: 'Two' },
      { id: 3, email: 'user3@example.com', firstName: 'User', lastName: 'Three' },
    ];
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
    (prisma.eventInvitation.findMany as jest.Mock).mockResolvedValueOnce([]);
    (prisma.eventInvitation.deleteMany as jest.Mock).mockResolvedValueOnce([]);
    (prisma.user.findMany as jest.Mock).mockResolvedValueOnce([]);
    (prisma.eventInvitation.createMany as jest.Mock).mockResolvedValue(undefined);
    (prisma.eventInvitation.findMany as jest.Mock).mockResolvedValue(
      mockedUsers.map((user) => ({
        userId: user.id,
        user,
      })),
    );

    const response = await request(app).patch(baseUrl(mockedEvent.id)).set('Authorization', 'Bearer mocktoken').send({
      title: updatedMockedEvent.title,
      invited: [],
    });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Event updated successfully');
    expect(response.body.event.invitations).toHaveLength(mockedUsers.length);
    expect(response.body.event.invitations[0].user.email).toBe('user2@example.com');
    expect(response.body.event.invitations[1].user.email).toBe('user3@example.com');
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

  it('Should remove invitations for users not in the new invited list', async () => {
    const mockedUser = adminUser;
    const mockedEvent = {
      ...eventData,
      ownerId: adminUser.id,
      title: 'Old title',
    };
    const currentInvitations = [{ userId: 2 }, { userId: 3 }];

    (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(mockedUser);
    (prisma.event.findUnique as jest.Mock).mockResolvedValueOnce(mockedEvent);
    (prisma.event.update as jest.Mock).mockResolvedValueOnce(mockedEvent);
    (prisma.eventInvitation.findMany as jest.Mock).mockResolvedValueOnce(currentInvitations);
    (prisma.eventInvitation.deleteMany as jest.Mock).mockResolvedValueOnce({ count: 1 });

    const response = await request(app)
      .patch(baseUrl(mockedEvent.id))
      .set('Authorization', 'Bearer mocktoken')
      .send({
        invited: [3],
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Event updated successfully');
    expect(prisma.eventInvitation.deleteMany).toHaveBeenCalledWith({
      where: {
        eventId: mockedEvent.id,
        userId: { in: [2] },
      },
    });
  });
});
