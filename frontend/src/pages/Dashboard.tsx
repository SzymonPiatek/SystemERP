import { Flex, Grid, GridItem } from '@chakra-ui/react';
import { FC } from 'react';
import { EventCalendar } from '../components/calendar/EventCalendar';
import { DailyCalendar } from '../components/calendar/DailyCalendar';

export const Dashboard: FC<{}> = () => {
  return (
    <Flex wrap="wrap" gap="4">
      <Grid templateColumns={{ base: 'repeat(3, 1fr)', lg: 'repeat(3, 1fr)' }} gap="4" w="full">
        <GridItem colSpan={{ base: 3, lg: 2 }}>
          <DailyCalendar />
        </GridItem>
        <GridItem colSpan={{ base: 3, lg: 1 }}>
          <EventCalendar />
        </GridItem>
      </Grid>
    </Flex>
  );
};
