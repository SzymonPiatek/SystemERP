import { FC } from 'react';
import { Center, Spinner } from '@chakra-ui/react';

export type FullScreenSpinnerProps = {};

export const FullScreenSpinner: FC<FullScreenSpinnerProps> = (props) => {
  return (
    <Center width="100%" height="100%" position="absolute" top="0" left="0" bg="white">
      <Spinner borderWidth="10px" animationDuration="0.8s" color="green.600" size="xl" />
    </Center>
  );
};
