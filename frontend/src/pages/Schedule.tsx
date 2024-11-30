import { Box } from '@chakra-ui/react';
import { FC } from 'react';
import BigCalendar from '../components/calendar/BigCalendar.tsx';

export const Schedule: FC<{}> = () => {
  return (
    <Box>
      <BigCalendar />
    </Box>
  );
};
