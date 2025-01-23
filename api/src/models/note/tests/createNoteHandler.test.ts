import '@src/tests/mocks';
import { adminUser } from '@src/tests/data';
import prisma from '@src/prismaClient';
import request from 'supertest';
import app from '@src/app';

const baseUrl = '/api/v1/notes/';

describe('createNoteHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should return 404 - owner not found', async () => {
    const noteData = {
      title: 'Test note',
      description: 'Test description',
      date: new Date('2025-01-22T13:36:35.561Z'),
      ownerId: 999999,
    };

    (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(null);

    const response = await request(app).post(baseUrl).set('Authorization', 'Bearer mocktoken').send(noteData);

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Owner not found');
  });

  it(`Should create note`, async () => {
    const mockedUser = adminUser;

    const noteData = {
      title: 'Test note',
      description: 'Test description',
      date: new Date('2025-01-22T13:36:35.561Z'),
      ownerId: adminUser.id,
    };

    const mockedNote = {
      ...noteData,
      id: 1,
      date: noteData.date.toDateString(),
    };

    (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(mockedUser);
    (prisma.note.create as jest.Mock).mockResolvedValueOnce(mockedNote);

    const response = await request(app).post(baseUrl).set('Authorization', 'Bearer mocktoken').send(noteData);

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Note created');
    expect(response.body.note).toEqual(mockedNote);
  });

  it(`Should return validation error`, async () => {
    const mockedUser = adminUser;

    const noteData = {
      description: 'Test description',
      date: new Date('2025-01-22T13:36:35.561Z'),
      ownerId: adminUser.id,
    };

    (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(mockedUser);

    const response = await request(app).post(baseUrl).set('Authorization', 'Bearer mocktoken').send(noteData);

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('"title" is required');
  });
});
