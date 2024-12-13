import { FC } from 'react';
import { Center, Spinner, Text, Flex } from '@chakra-ui/react';

export type FullScreenSpinnerProps = {};

export const FullScreenSpinner: FC<FullScreenSpinnerProps> = (props) => {
  return (
    <Center
      width="100%"
      height="100%"
      position="absolute"
      top="0"
      left="0"
      bg="white/40"
      zIndex="1000"
    >
      <Flex scale="2.3" justifyContent="center" direction="column" alignItems="center" gap="4">
        <Spinner borderWidth="6px" animationDuration="1.0s" color="green.600" size="xl" />
        <Text color="white">Loading...</Text>
      </Flex>
    </Center>
  );
};
