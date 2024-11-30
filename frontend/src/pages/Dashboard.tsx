import { Flex, Box } from '@chakra-ui/react';
import { FC } from 'react';
import { BoxWithTitle } from '../components/ui/BoxWithTitle';
import BigCalendar from '../components/calendar/BigCalendar';
import { DailyCalendar } from '../components/calendar/DailyCalendar';

export const Dashboard: FC<{}> = () => {
  return (
    <Flex wrap="wrap">
      <BoxWithTitle Title="Dashboard" Text="Test box"></BoxWithTitle>
      <Box w="1/3">
        <DailyCalendar />
      </Box>
    </Flex>
  );
};
