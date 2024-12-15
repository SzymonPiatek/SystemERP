import { notesData } from './notesData';
import prisma from '../../prismaClient';

export const createNotes = async () => {
  const upsertPromises = notesData.map((note) =>
    prisma.note.upsert({
      where: { id: note.id },
      update: {
        ...note,
        id: undefined,
      },
      create: {
        ...note,
        id: undefined,
      },
    }),
  );

  await Promise.all(upsertPromises);
};
