import { Card, Flex } from '@chakra-ui/react';
import { FC } from 'react';
import BigCalendar from '../components/calendar/BigCalendar.tsx';
import { ScheduleForm } from '../components/form/ScheduleForm.tsx';

export const Schedule: FC<{}> = () => {
  return (
    <Flex w="full" h="full">
      <Card.Root rounded="2xl" p="4" pt="4" pb="4" w="full" h="fit">
        <Card.Body>
          <BigCalendar set="WORK_WEEK" />
          <ScheduleForm />
        </Card.Body>
      </Card.Root>
    </Flex>
  );
};
