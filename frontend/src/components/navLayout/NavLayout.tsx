import { Box, Stack, Flex, VStack } from '@chakra-ui/react';
import { FC, PropsWithChildren, useContext } from 'react';
import { Logo } from '../logo/Logo.tsx';
import { TopBarLayout } from '../topBarLayout/TopBarLayout.tsx';
import { NavLink } from './NavLink.tsx';
import { MdDashboard, MdCalendarMonth, MdPeopleAlt, MdNotes, MdChecklist } from 'react-icons/md';
import { TextWithIcon } from './TextWithIcon';
import NavFooter from './NavFooter.tsx';
import { AuthContext } from '../../contexts/AuthContext.tsx';

export type NavLayoutProps = PropsWithChildren<{}>;

export const NavLayout: FC<NavLayoutProps> = (props) => {
  const { children } = props;
  const { user } = useContext(AuthContext);

  return (
    <Flex flex="1">
      <Stack
        as="aside"
        bg={{ base: 'white', _dark: 'black' }}
        width={['15%', '13%']}
        minH="100vh"
        position="fixed"
        left="0"
        top="0"
        justifyContent="space-between"
      >
        <Box>
          <Box h="4rem" display="flex" placeItems="center">
            <Logo />
          </Box>
          <Stack as="nav" px={4} pb={8}>
            <NavLink to="/">
              <TextWithIcon title="Dashboard" Icon={MdDashboard}></TextWithIcon>
            </NavLink>
            <NavLink to="/schedule">
              <TextWithIcon title="Schedule" Icon={MdCalendarMonth}></TextWithIcon>
            </NavLink>
            <NavLink to="/users">
              <TextWithIcon title="Users" Icon={MdPeopleAlt}></TextWithIcon>
            </NavLink>
            <NavLink to="/notes">
              <TextWithIcon title="Notes" Icon={MdNotes}></TextWithIcon>
            </NavLink>
            <NavLink to="/orders">
              <TextWithIcon title="Orders" Icon={MdChecklist}></TextWithIcon>
            </NavLink>
          </Stack>
        </Box>
        <Box p={4}>
          <NavFooter />
        </Box>
      </Stack>

      <VStack ml={['15%', '13%']} width="full" height="100vh" overflow="hidden">
        {user && <TopBarLayout user={user} />}

        <Box flex="1" width="100%" overflowY="auto">
          {children}
        </Box>
      </VStack>
    </Flex>
  );
};
