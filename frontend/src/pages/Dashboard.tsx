import { Flex, Box } from '@chakra-ui/react';
import { FC } from 'react';
import { BoxWithTitle } from '../components/ui/BoxWithTitle';
import { EventCalendar } from '../components/calendar/EventCalendar';
import { DailyCalendar } from '../components/calendar/DailyCalendar';

export const Dashboard: FC<{}> = () => {
  return (
    <Flex wrap="wrap">
      <DailyCalendar />
      <EventCalendar />
    </Flex>
  );
};
