import { Flex, Text, VStack } from '@chakra-ui/react';

const NavFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Flex color="black" justify="center" direction="column" alignItems="center">
      <VStack justify="center" align="center">
        <Text fontSize="xs" color="gray.600" textAlign="center">
          &copy; {currentYear} NovaERP
        </Text>
        <Text fontSize="xs" color="gray.600" textAlign="center">
          All rights reserved.
        </Text>
      </VStack>
    </Flex>
  );
};

export default NavFooter;
