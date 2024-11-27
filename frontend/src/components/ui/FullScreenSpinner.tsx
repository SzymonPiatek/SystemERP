import { FC } from 'react';
import { Center, Spinner } from '@chakra-ui/react';

export type FullScreenSpinnerProps = {};

export const FullScreenSpinner: FC<FullScreenSpinnerProps> = (props) => {
  return (
    <Center h="100vh" w="100vw">
      <Spinner borderWidth="10px" animationDuration="0.8s" color="green.600" size="xl" />
    </Center>
  );
};
