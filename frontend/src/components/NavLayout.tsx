import { Box, Stack, Flex, VStack } from '@chakra-ui/react';
import { FC, PropsWithChildren } from 'react';

import { Logo } from '../components/Logo';
import { TopBarLayout } from '../components/TopBarLayout';
import { NavLink } from './NavLayout/NavLink';

export type NavLayoutProps = PropsWithChildren<{}>;

export const NavLayout: FC<NavLayoutProps> = (props) => {
  const { children } = props;

  return (
    <Flex background="gray.100" p={0} minH="100vh">
      <Stack
        as="aside"
        height="full"
        background="white"
        minWidth={[null, '15%', '13%']}
        maxWidth={[null, '15%', '13%']}
        minH="100vh"
        position="sticky"
        left="0"
        top="0"
      >
        <Box px={8} py={5}>
          <Logo />
        </Box>
        <Stack as="nav" height="full" overflowY="auto">
          <Box px={4} pb={8}>
            <NavLink to="/">Dashboard</NavLink>
            <NavLink to="/schedule">Schedule</NavLink>
          </Box>
        </Stack>
      </Stack>
      <VStack w="full">
        <TopBarLayout />
        <Box flex={1} pl={8} w="full">
          {children}
        </Box>
      </VStack>
    </Flex>
  );
};
