import { Box, Flex, VStack } from '@chakra-ui/react';
import { FC } from 'react';

export const Notes: FC<{}> = () => {
  return (
    <Box>
      <VStack>
        {new Array(10).fill('testowe notatki').map((name, idx) => {
          return <Flex key={idx}>{name}</Flex>;
        })}
      </VStack>
    </Box>
  );
};
