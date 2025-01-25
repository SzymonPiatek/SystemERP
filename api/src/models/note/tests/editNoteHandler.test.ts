import '@src/tests/mocks';
import { adminUser } from '@src/tests/data';
import prisma from '@src/prismaClient';
import request from 'supertest';
import app from '@src/app';

const baseUrl = (id: number) => {
  return `/api/v1/notes/${id}`;
};

describe('editNoteHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should return 404 - note not found', async () => {
    const mockedUser = adminUser;

    (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(mockedUser);
    (prisma.note.findUnique as jest.Mock).mockResolvedValueOnce(null);

    const response = await request(app).patch(baseUrl(999999)).set('Authorization', 'Bearer mocktoken').send({
      title: 'Example',
    });

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Note not found');
  });

  it('Should be able to edit note', async () => {
    const mockedUser = adminUser;

    const mockedNote = {
      id: 1,
      title: 'Test Note',
      description: 'Test Description',
      ownerId: mockedUser.id,
    };

    const updatedNote = {
      ...mockedNote,
      title: 'Updated Note',
    };

    (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(mockedUser);
    (prisma.note.findUnique as jest.Mock).mockResolvedValueOnce(mockedNote);
    (prisma.note.update as jest.Mock).mockResolvedValue(updatedNote);

    const response = await request(app).patch(baseUrl(mockedNote.id)).set('Authorization', 'Bearer mocktoken').send({
      title: updatedNote.title,
    });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Note updated successfully');
  });

  it('Should return validation error', async () => {
    const mockedUser = adminUser;

    const mockedNote = {
      id: 1,
      title: 'Test Note',
      description: 'Test Description',
      ownerId: mockedUser.id,
    };

    (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(mockedUser);
    (prisma.note.findUnique as jest.Mock).mockResolvedValueOnce(mockedNote);

    const response = await request(app).patch(baseUrl(mockedNote.id)).set('Authorization', 'Bearer mocktoken').send({
      title: 123,
    });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('"title" must be a string');
  });
});
