import { Flex, IconButton, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { MdOutlineLogout, MdPerson } from 'react-icons/md';

const NavFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Flex color="black" justify="center" direction="column" alignItems="center">
      <Flex mb={2} direction={{ base: 'column', lg: 'row' }}>
        <IconButton size="xs" aria-label="Logout" _hover={{ color: 'green.600' }}>
          <MdOutlineLogout />
          <Text display={{ base: 'none', lg: 'block' }}>Logout</Text>
        </IconButton>
        <Link to="/profile">
          <IconButton size="xs" aria-label="Profile" _hover={{ color: 'green.600' }}>
            <MdPerson />
            <Text display={{ base: 'none', lg: 'block' }}>Profile</Text>
          </IconButton>
        </Link>
      </Flex>
      <Text fontSize="xs" color="gray.600">
        &copy; {currentYear} Cebulki Programowania.
      </Text>
      <Text fontSize="xs" color="gray.600" hideBelow="lg">
        {' '}
        All rights reserved.
      </Text>
    </Flex>
  );
};

export default NavFooter;
