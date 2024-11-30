import { Flex } from '@chakra-ui/react';
import { FC } from 'react';
import { BoxWithTitle } from '../components/ui/BoxWithTitle';
import ItemList from '../components/list/ItemList';

export const Dashboard: FC<{}> = () => {
  return (
    <Flex wrap="wrap">
      <BoxWithTitle Title="Dashboard" Text="Test box">
      </BoxWithTitle>
      <ItemList />
    </Flex>
  );
};
