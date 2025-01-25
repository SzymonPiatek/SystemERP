import '@src/tests/mocks';
import { adminUser } from '@src/tests/data';
import prisma from '@src/prismaClient';
import request from 'supertest';
import app from '@src/app';

const baseUrl = `/api/v1/notes/`;

describe('getAllNotesHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it(`Should return user's notes`, async () => {
    const mockedUser = adminUser;

    const mockedNote = {
      title: 'Note',
      description: 'Description',
      ownerId: mockedUser.id,
    };

    const mockedNotes = [
      { ...mockedNote, id: 1 },
      { ...mockedNote, id: 2 },
      { ...mockedNote, id: 3 },
    ];

    (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(mockedUser);
    (prisma.note.findMany as jest.Mock).mockResolvedValueOnce(mockedNotes);
    (prisma.note.count as jest.Mock).mockResolvedValueOnce(mockedNotes.length);

    const response = await request(app).get(baseUrl).set('Authorization', 'Bearer mocktoken');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.total).toBe(mockedNotes.length);
    expect(response.body.data).toEqual(mockedNotes);
  });
});
