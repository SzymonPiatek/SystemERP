import { Flex } from '@chakra-ui/react';
import { FC } from 'react';
import { EventCalendar } from '../components/calendar/EventCalendar';
import { DailyCalendar } from '../components/calendar/DailyCalendar';
import { CardBox } from '../components/Cardbox';

export const Dashboard: FC<{}> = () => {
  return (
    <Flex wrap="wrap">
      <DailyCalendar />
      <EventCalendar />
    </Flex>
  );
};
