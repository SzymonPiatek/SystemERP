import { Box, Flex } from '@chakra-ui/react';
import { FC } from 'react';
import BigCalendar from '../components/calendar/BigCalendar.tsx';

export const Schedule: FC<{}> = () => {
  return (
    <Flex wrap="wrap">
      <Box bg="white" rounded="2xl" p="4" pt="8" pb="8" m="2" w="full">
        <BigCalendar />
      </Box>
    </Flex>
  );
};
