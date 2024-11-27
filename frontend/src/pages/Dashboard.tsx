import { Flex } from '@chakra-ui/react';
import { FC } from 'react';
import { BoxWithTitle } from '../components/ui/BoxWithTitle';

export const Dashboard: FC<{}> = () => {
  return (
    <Flex>
      <BoxWithTitle Title="Dashboard" Text="Test box"></BoxWithTitle>
    </Flex>
  );
};
