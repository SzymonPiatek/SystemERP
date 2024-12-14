import prisma from '../../prismaClient';
import { eventsData } from './eventsData';

export const createEvents = async () => {
  const upsertPromises = eventsData.map((event) =>
    prisma.event.upsert({
      where: { id: event.id },
      update: {
        ...event,
        id: undefined,
      },
      create: event,
    }),
  );

  await Promise.all(upsertPromises);
};
