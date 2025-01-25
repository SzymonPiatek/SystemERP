import '@src/tests/mocks';
import { adminUser } from '@src/tests/data';
import prisma from '@src/prismaClient';
import request from 'supertest';
import app from '@src/app';

const baseUrl = (id: number) => {
  return `/api/v1/notes/${id}`;
};

describe('getNoteByIdHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should return 403 - access denied', async () => {
    const mockedNote = {
      id: 1,
      title: 'Note 1',
      description: 'Description',
      ownerId: 1,
    };

    (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(null);

    const response = await request(app).get(baseUrl(mockedNote.id)).set('Authorization', 'Bearer mocktoken');

    expect(response.status).toBe(403);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Access denied');
  });

  it('Should return note', async () => {
    const mockedUser = adminUser;
    const mockedNote = {
      id: 1,
      title: 'Note 1',
      description: 'Description',
      ownerId: mockedUser.id,
    };

    (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(mockedUser);
    (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(mockedUser);
    (prisma.note.findUnique as jest.Mock).mockResolvedValue(mockedNote);

    const response = await request(app).get(baseUrl(mockedNote.id)).set('Authorization', 'Bearer mocktoken');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.note).toEqual(mockedNote);
  });

  it('Should return 404 - note not found', async () => {
    const mockedUser = adminUser;

    (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(mockedUser);
    (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(mockedUser);
    (prisma.note.findUnique as jest.Mock).mockResolvedValue(null);

    const response = await request(app).get(baseUrl(1)).set('Authorization', 'Bearer mocktoken');

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toEqual('Note not found');
  });
});
