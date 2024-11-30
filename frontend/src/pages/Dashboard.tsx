import { Box } from '@chakra-ui/react';
import { FC } from 'react';
import ItemList from '../components/list/ItemList';

export const Dashboard: FC<{}> = () => {
  return (
    <Box>
      Dashboard
      <Box>
        <ItemList />
      </Box>
    </Box>
  );
};
