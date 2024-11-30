import { Flex, Button } from '@chakra-ui/react';
import { MdDeleteForever } from 'react-icons/md';
import { MdAccountCircle } from 'react-icons/md';
const EditButtons = () => {
  return (
    <Flex color="black" alignItems="center" paddingBlock="3" justifyContent="flex-end" width="full">
      <Button paddingInline="4px">
        <MdAccountCircle />
      </Button>
      <Button paddingInline="4px">
        <MdDeleteForever />
      </Button>
    </Flex>
  );
};
export default EditButtons;
