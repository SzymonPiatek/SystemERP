import { Box } from '@chakra-ui/react';
import { FC } from 'react';
import { FullScreenSpinner } from '../components/ui/FullScreenSpinner';

export const Error: FC<{}> = () => {
  return (
    <Box>
      Error
      <FullScreenSpinner />
    </Box>
  );
};
