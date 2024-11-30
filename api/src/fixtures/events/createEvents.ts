import prisma from '../../prismaClient';
import { eventsData } from './eventsData';

export const createEvents = eventsData.map((event) =>
  prisma.event.upsert({
    where: { id: event.id },
    update: event,
    create: event,
  }),
);
