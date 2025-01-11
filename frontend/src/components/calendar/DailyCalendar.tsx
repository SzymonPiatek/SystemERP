import { Box, Flex, Card } from '@chakra-ui/react';
import { FC } from 'react';
import BigCalendar from '../../components/calendar/BigCalendar.tsx';
import { AxiosError } from 'axios';
import { Event } from '../../utils/types';
import { useState, useEffect } from 'react';
import { getEvents } from '../../actions/eventActions';
import { BoxWithTitle } from '../ui/BoxWithTitle.tsx';

export const DailyCalendar: FC<{}> = () => {
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
    <Flex wrap="wrap" w="100%">
      <Card.Root rounded="2xl" p="4" w="100%">
        <Card.Body>
          <BoxWithTitle Title="Daily Schedule" />
          <BigCalendar events={formattedEvents} set="DAY" classes="daily" />
        </Card.Body>
      </Card.Root>
    </Flex>
  );
};
