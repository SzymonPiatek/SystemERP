import { Flex } from '@chakra-ui/react';
import AvatarWithTitle from './AvatarWithTitle';
import DataInfo from './DataInfo';
import EditButtons from './EditButtons';

const ItemList = () => {
  return (
    <Flex color="black" bg="white" rounded="xl" p="4" width="full">
      <AvatarWithTitle />
      <DataInfo />
      <EditButtons />
    </Flex>
  );
};
export default ItemList;
