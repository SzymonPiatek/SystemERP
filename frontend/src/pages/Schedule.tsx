import { Box, Flex } from '@chakra-ui/react';
import { FC } from 'react';
import BigCalendar from '../components/calendar/BigCalendar.tsx';
import { AxiosError } from 'axios';
import { Event } from '../utils/types';
import { useState, useEffect } from 'react';
import { getEvents } from '../actions/eventActions';

export const Schedule: FC<{}> = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getEvents();

        if (!(response instanceof AxiosError)) {
          // @ts-ignore
          setEvents(response.events);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const formattedEvents = events.map((event: any) => ({
    title: event.title,
    allDay: event.isAllDay,
    start: new Date(event.startDate),
    end: new Date(event.endDate),
  }));

  return (
    <Flex wrap="wrap">
      <Box bg="white" rounded="2xl" p="4" pt="8" pb="8" m="2" w="full">
        <BigCalendar events={formattedEvents} set="WORK_WEEK" />
      </Box>
    </Flex>
  );
};
