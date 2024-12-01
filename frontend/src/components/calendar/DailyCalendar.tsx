import { Box, Flex } from '@chakra-ui/react';
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
        console.log(response);

        if (!(response instanceof AxiosError)) {
          setEvents(response.events);
        }
        console.log(response.data.events);
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
      <Box bg="white" rounded="2xl" p="4" w="full">
        <BoxWithTitle Title="Daily Schedule" />
        <BigCalendar events={formattedEvents} set="DAY" classes="daily" />
      </Box>
    </Flex>
  );
};
