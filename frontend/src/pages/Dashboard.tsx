import { Flex, Grid, GridItem } from '@chakra-ui/react';
import { FC } from 'react';
import { EventCalendar } from '../components/calendar/EventCalendar';
import { DailyCalendar } from '../components/calendar/DailyCalendar';
import { UserCard } from '../components/dashboard/UserCard';

export const Dashboard: FC<{}> = () => {
  return (
    <Flex wrap="wrap" gap="4">
      <Grid templateColumns={{ base: 'repeat(3, 1fr)', lg: '2fr 1fr' }} gap="4" w="full">
        <GridItem>
          <Grid templateColumns={{ base: 'repeat(3, 1fr)', lg: '2fr 3fr' }} gap="4" w="full">
            <GridItem>
              <UserCard />
            </GridItem>
          </Grid>
        </GridItem>
        <GridItem></GridItem>
      </Grid>

      <Grid templateColumns={{ base: 'repeat(3, 1fr)', lg: '2fr 1fr' }} gap="4" w="full">
        <GridItem>
          <DailyCalendar />
        </GridItem>
        <GridItem>
          <EventCalendar />
        </GridItem>
      </Grid>
    </Flex>
  );
};
