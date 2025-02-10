import { Flex, HStack, IconButton, Text, Box } from '@chakra-ui/react';
import { FC, useContext } from 'react';
import { Avatar } from '../ui/avatar';
import { MdOutlineAnnouncement, MdOutlineLogout } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { ColorModeButton } from '../ui/color-mode.tsx';
import { Logo } from '../logo/Logo.tsx';

export const TopBarLayout: FC = () => {
  const { logout, user } = useContext(AuthContext);

  return (
    <Flex
      justify="space-between"
      align="center"
      bg={{ base: 'white', _dark: 'black' }}
      color={{ base: 'black', _dark: 'white' }}
      width="100%"
    >
      {/* LOGO */}
      <Box maxW={{ base: '80px', lg: '200px' }}>
        <Logo />
      </Box>

      {/* Login section */}
      <Flex alignItems="center" gap="6" flex="1" justify="flex-end" pr={4}>
        <HStack gap="1">
          <ColorModeButton variant="outline" size="xs" />
          <IconButton size="xs" onClick={logout} variant="outline" aria-label="Logout">
            <MdOutlineLogout />
          </IconButton>
          <IconButton size="xs" variant="outline" aria-label="Announcements">
            <MdOutlineAnnouncement />
          </IconButton>
        </HStack>
        {/* Auth */}
        {user ? (
          <>
            <Flex direction="column">
              <Link to="/profile">
                <Text textStyle="sm">
                  {user.firstName} {user.lastName}
                </Text>
                {user.profile?.role && (
                  <Text textStyle="xs" color="gray.500">
                    {user.profile.role.name}
                  </Text>
                )}
              </Link>
            </Flex>
            <Link to="/profile">
              <Avatar size="xs" src={user.profile?.profilePicBase64 ?? ''} cursor="pointer" />
            </Link>
          </>
        ) : (
          <Text textStyle="sm" color="gray.500">
            Not Logged In
          </Text>
        )}
      </Flex>
    </Flex>
  );
};
