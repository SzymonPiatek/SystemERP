import { Flex, IconButton, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { MdOutlineLogout, MdPerson } from 'react-icons/md';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext.tsx';

const NavFooter = () => {
  const { logout } = useContext(AuthContext);
  const currentYear = new Date().getFullYear();

  return (
    <Flex color="black" justify="center" direction="column" alignItems="center">
      <Flex mb={2} direction={{ base: 'column', lg: 'row' }}>
        <IconButton size="xs" aria-label="Logout" _hover={{ color: 'green.600' }} onClick={logout}>
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
      <VStack justify="center" align="center">
        <Text fontSize="xs" color="gray.600" textAlign="center">
          &copy; {currentYear} NovaERP
        </Text>
        <Text fontSize="xs" color="gray.600" hideBelow="lg">
          All rights reserved.
        </Text>
      </VStack>
    </Flex>
  );
};

export default NavFooter;
