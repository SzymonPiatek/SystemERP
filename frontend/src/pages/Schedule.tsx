import { Card, Flex } from '@chakra-ui/react';
import { FC, useState, useEffect } from 'react';
import BigCalendar from '../components/calendar/BigCalendar.tsx';
import { AxiosError } from 'axios';
import { Event } from '../utils/types';
import { getEvents } from '../actions/eventActions';
import { ScheduleForm } from '../components/form/ScheduleForm.tsx';

export const Schedule: FC<{}> = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getEvents();

        if (!(response instanceof AxiosError)) {
          setEvents(response.events);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const formattedEvents = events.map((event: any) => ({
    id: event.id,
    title: event.title,
    allDay: event.isAllDay,
    start: new Date(event.startDate),
    end: new Date(event.endDate),
  }));

  return (
    <Flex w="full" h="full">
      <Card.Root rounded="2xl" p="4" pt="4" pb="4" w="full" h="fit">
        <Card.Body>
          <BigCalendar events={formattedEvents} set="WORK_WEEK" />
          <ScheduleForm />
        </Card.Body>
      </Card.Root>
    </Flex>
  );
};
