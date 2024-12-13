import { Box, Text, Flex } from '@chakra-ui/react';
import { useState, FC } from 'react';
import Calendar from 'react-calendar';

import 'react-calendar/dist/Calendar.css';
import { BoxWithTitle } from '../ui/BoxWithTitle';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

// TEMPORARY
const events = [
  {
    id: 1,
    title: 'Lorem ipsum dolor',
    time: '12:00 PM - 2:00 PM',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 2,
    title: 'Lorem ipsum dolor',
    time: '12:00 PM - 2:00 PM',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 3,
    title: 'Lorem ipsum dolor',
    time: '12:00 PM - 2:00 PM',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
];

export const EventCalendar: FC<{}> = () => {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <Box p="4" bg="white" rounded="2xl">
      <BoxWithTitle Title="Calendar" />
      <Calendar onChange={onChange} value={value} />
      <Box>
        <BoxWithTitle Text="notes" />
      </Box>
      <Flex direction="column">
        {events.map((event) => (
          <Box key={event.id}>
            <Box>
              <Text>{event.title}</Text>
              <Text>{event.time}</Text>
            </Box>
            <Text>{event.description}</Text>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};
