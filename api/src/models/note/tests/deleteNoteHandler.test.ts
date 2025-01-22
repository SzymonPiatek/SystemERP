import '@src/tests/mocks';
import prisma from '@src/prismaClient';
import request from 'supertest';
import app from '@src/app';

const baseUrl = (id: number) => {
  return `/api/v1/notes/${id}`;
};

describe('deleteNoteHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should delete note if it exists and user is the owner', async () => {
    const mockNote = { id: 1, title: 'Test Note', description: 'Test Description', ownerId: 1 };

    (prisma.note.findUnique as jest.Mock).mockResolvedValueOnce(mockNote);
    (prisma.note.delete as jest.Mock).mockResolvedValueOnce(mockNote);

    const response = await request(app).delete(baseUrl(mockNote.id)).set('Authorization', 'Bearer mocktoken').send();

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Note deleted');
  });

  it('Should return 404 if note does not exist', async () => {
    (prisma.note.findUnique as jest.Mock).mockResolvedValueOnce(null);

    const response = await request(app).delete(baseUrl(999999)).set('Authorization', 'Bearer mocktoken').send();

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Note not found');
  });

  it('Should return 500 if there is an internal server error', async () => {
    const mockNote = { id: 1, title: 'Test Note', description: 'Test Description', ownerId: 1 };

    (prisma.note.findUnique as jest.Mock).mockResolvedValueOnce(mockNote);
    (prisma.note.delete as jest.Mock).mockRejectedValueOnce(new Error());

    const response = await request(app).delete(baseUrl(mockNote.id)).set('Authorization', 'Bearer mocktoken').send();

    expect(response.status).toBe(500);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Internal Server Error');
  });
});
