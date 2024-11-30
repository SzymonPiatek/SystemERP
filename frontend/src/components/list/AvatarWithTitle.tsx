import { Flex, Text, VStack } from '@chakra-ui/react';
import { Avatar } from '../ui/avatar';

const AvatarWithTitle = () => {
  return (
    <Flex color="black" alignItems="center" width="15%">
      <Avatar size="sm" name="Sage" src="https://bit.ly/sage-adebayo" />
      <VStack paddingInline="30px">
        <Text>John Doe</Text>
        <Text>test@admin.pl</Text>
      </VStack>
    </Flex>
  );
};
export default AvatarWithTitle;
