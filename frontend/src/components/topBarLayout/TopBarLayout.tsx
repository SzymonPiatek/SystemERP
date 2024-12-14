import { Box, Flex, IconButton, Text } from '@chakra-ui/react';
import { FC, useContext } from 'react';
import { Avatar } from '../ui/avatar';
import { MdOutlineAnnouncement, MdOutlineLogout } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import type { User } from '../../utils/types.ts';

type TopBarProps = {
  user: User;
};

export const TopBarLayout: FC<TopBarProps> = ({ user }) => {
  const { logout } = useContext(AuthContext);

  return (
    <Flex
      justify="space-between"
      p="4"
      align="center"
      bg="white"
      height="4rem"
      color="black"
      width="full"
      hideBelow="lg"
      position="sticky"
      top="0"
      zIndex="999"
    >
      {/* ORDERS */}
      {/*<Flex align="center" gap="1">*/}
      {/*  <Box bg="red.600" h="4" w="4" rounded="full"></Box>*/}
      {/*  <Text textStyle="xs">2</Text>*/}
      {/*  <Box bg="yellow.600" h="4" w="4" rounded="full"></Box>*/}
      {/*  <Text textStyle="xs">12</Text>*/}
      {/*  <Box bg="green.600" h="4" w="4" rounded="full"></Box>*/}
      {/*  <Text textStyle="xs">5</Text>*/}
      {/*</Flex>*/}
      <Flex></Flex>

      {/* ICONS AND USER */}
      <Flex align="center" gap="6" justifySelf="end">
        <Box>
          <IconButton size="xs" onClick={logout}>
            <MdOutlineLogout />
          </IconButton>
          <IconButton size="xs">
            <MdOutlineAnnouncement />
          </IconButton>
        </Box>
        <Flex direction="column">
          <Link to="/profile">
            <Text textStyle="sm">
              {user.firstName} {user.lastName}
            </Text>
            {user.profile && user.profile.role && (
              <Text textStyle="xs" color="gray.500">
                {user.profile.role.name}
              </Text>
            )}
          </Link>
        </Flex>
        <Link to="/profile">
          <Avatar size="xs" name="John Doe" src="https://bit.ly/sage-adebayo" cursor="pointer" />
        </Link>
      </Flex>
    </Flex>
  );
};
