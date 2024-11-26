import { Box, Flex, IconButton, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { Avatar } from '../ui/avatar';

import { MdOutlineAnnouncement, MdOutlineLogout, MdPerson } from 'react-icons/md';
import { Link } from 'react-router-dom';

type TopBarProps = {};

export const TopBarLayout: FC<TopBarProps> = (props) => {
  return (
    <Flex
      justify="space-between"
      p="4"
      align="center"
      bg="white"
      color="black"
      width="full"
      hideBelow="lg"
      position="sticky"
      top="0"
      zIndex="999"
    >
      {/* NOTES */}
      <Flex align="center" gap="1">
        <Box bg="red.600" h="4" w="4" rounded="full"></Box>
        <Text textStyle="xs">2</Text>
        <Box bg="yellow.600" h="4" w="4" rounded="full"></Box>
        <Text textStyle="xs">12</Text>
        <Box bg="green.600" h="4" w="4" rounded="full"></Box>
        <Text textStyle="xs">5</Text>
      </Flex>
      {/* ICONS AND USER */}
      <Flex align="center" gap="6">
        <Box>
          <IconButton size="xs">
            <MdOutlineLogout />
          </IconButton>
          <IconButton size="xs">
            <MdOutlineAnnouncement />
          </IconButton>
          <Link to="/profile">
            <IconButton size="xs">
              <MdPerson />
            </IconButton>
          </Link>
        </Box>
        <Flex direction="column">
          <Text textStyle="sm">John Doe</Text>
          <Text textStyle="xs" color="gray.500">
            Admin
          </Text>
        </Flex>
        <Avatar size="xs" name="John Doe" src="https://bit.ly/sage-adebayo" cursor="pointer" />
      </Flex>
    </Flex>
  );
};
