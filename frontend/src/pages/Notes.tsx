import { Box, Flex, VStack } from '@chakra-ui/react';
import { FC } from 'react';
import { SingleNote } from '../components/notes/SingleNote';

export const Notes: FC<{}> = () => {
  return (
    <Box>
      <Flex wrap="wrap">
        {new Array(10).fill('testowe notatki').map((name, idx) => {
          return <SingleNote title={name} desc={name} status="active" />;
        })}
      </Flex>
    </Box>
  );
};
