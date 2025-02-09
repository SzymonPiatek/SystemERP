import '@src/tests/mocks';
import prisma from '@src/prismaClient';
import request from 'supertest';
import app from '@src/app';
import { adminUser, testUser } from '@src/tests/data';

const baseUrl = (id: number) => `/api/v1/events/${id}`;

describe('Delete event', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should return 404 if event does not exist', async () => {
    const mockedUser = adminUser;

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockedUser);
    (prisma.event.findUnique as jest.Mock).mockResolvedValue(null);

    const response = await request(app).delete(baseUrl(1)).set('Authorization', 'Bearer mocktoken');

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Event not found');
  });

  it('Should delete event successfully', async () => {
    const mockedUser = adminUser;

    const mockedEvent = { id: 1, ownerId: testUser.id };

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockedUser);
    (prisma.event.findUnique as jest.Mock).mockResolvedValue(mockedEvent);
    (prisma.eventInvitation.deleteMany as jest.Mock).mockResolvedValue({ count: 0 });
    (prisma.event.delete as jest.Mock).mockResolvedValue(mockedEvent);

    const response = await request(app).delete(baseUrl(mockedEvent.id)).set('Authorization', 'Bearer mocktoken');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Event deleted successfully');
  });
});
