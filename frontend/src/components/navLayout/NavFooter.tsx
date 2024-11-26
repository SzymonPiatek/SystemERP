import { Box, Flex, IconButton, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { MdOutlineAnnouncement, MdOutlineLogout, MdPerson } from 'react-icons/md';

const NavFooter = () => {
  // Get the current year
  const currentYear = new Date().getFullYear();

  return (
    <Flex color="black" justify="center" direction="column" alignItems="center">
      <Box mb={2}>
        <IconButton size="xs" aria-label="Logout">
          <MdOutlineLogout />
        </IconButton>
        <IconButton size="xs" aria-label="Announcements">
          <MdOutlineAnnouncement />
        </IconButton>
        <Link to="/profile">
          <IconButton size="xs" aria-label="Profile">
            <MdPerson />
          </IconButton>
        </Link>
      </Box>
      <Text fontSize="xs" color="gray.600">
        &copy; {currentYear} Cebulki Programowania.
      </Text>
      <Text fontSize="xs" color="gray.600">
        {' '}
        All rights reserved.
      </Text>
    </Flex>
  );
};

export default NavFooter;
