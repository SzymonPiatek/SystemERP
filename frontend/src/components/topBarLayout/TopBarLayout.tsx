import { Flex, HStack, IconButton, Text } from '@chakra-ui/react';
import { FC, useContext } from 'react';
import { Avatar } from '../ui/avatar';
import { MdOutlineAnnouncement, MdOutlineLogout } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import type { User } from '../../utils/types.ts';
import { ColorModeButton } from '../ui/color-mode.tsx';

type TopBarProps = {
  user: User;
};

export const TopBarLayout: FC<TopBarProps> = ({ user }) => {
  const { logout } = useContext(AuthContext);

  return (
    <Flex
      justify="end"
      p="4"
      align="center"
      bg={{ base: 'white', _dark: 'black' }}
      height="4rem"
      color={{ base: 'black', _dark: 'white' }}
      width="full"
      hideBelow="sm"
      position="sticky"
      top="0"
      zIndex="999"
      appearance="dark"
    >
      {/* ICONS AND USER */}
      <Flex align="center" gap="6" justifySelf="end">
        <HStack gap="1">
          <ColorModeButton variant="outline" size="xs" />
          <IconButton size="xs" onClick={logout} variant="outline">
            <MdOutlineLogout />
          </IconButton>
          <IconButton size="xs" variant="outline">
            <MdOutlineAnnouncement />
          </IconButton>
        </HStack>
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
          <Avatar
            size="xs"
            name="John Doe"
            src="https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da842aad38faee8092ff24740893"
            cursor="pointer"
          />
        </Link>
      </Flex>
    </Flex>
  );
};
