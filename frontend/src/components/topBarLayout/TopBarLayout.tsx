import { Box, Flex, IconButton, Text } from '@chakra-ui/react';
import { FC, useContext } from 'react';
import { Avatar } from '../ui/avatar';

import { MdOutlineAnnouncement, MdOutlineLogout, MdPerson } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

type TopBarProps = {
  FirstName: string;
  LastName: string;
  Role: string;
};

export const TopBarLayout: FC<TopBarProps> = (props) => {
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
          <Link to="/profile">
            <IconButton size="xs">
              <MdPerson />
            </IconButton>
          </Link>
        </Box>
        <Flex direction="column">
          <Text textStyle="sm">
            {props.FirstName} {props.LastName}
          </Text>
          <Text textStyle="xs" color="gray.500">
            {props.Role}
          </Text>
        </Flex>
        <Avatar size="xs" name="John Doe" src="https://bit.ly/sage-adebayo" cursor="pointer" />
      </Flex>
    </Flex>
  );
};
