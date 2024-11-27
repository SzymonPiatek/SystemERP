import { Box, Stack, Flex, VStack } from '@chakra-ui/react';
import { FC, PropsWithChildren } from 'react';

import { Logo } from '../logo/Logo.tsx';
import { TopBarLayout } from '../topBarLayout/TopBarLayout.tsx';
import { NavLink } from './NavLink.tsx';
import { MdDashboard, MdCalendarMonth, MdPeopleAlt, MdNotes } from 'react-icons/md';
import { TextWithIcon } from './TextWithIcon';
import NavFooter from './NavFooter.tsx';

export type NavLayoutProps = PropsWithChildren<{}>;

export const NavLayout: FC<NavLayoutProps> = (props) => {
  const { children } = props;

  return (
    <Flex background="gray.100" p={0} minH="100vh">
      <Stack
        as="aside"
        background="white"
        minWidth={[null, '15%', '13%']}
        maxWidth={[null, '15%', '13%']}
        minH="100vh"
        position="sticky"
        left="0"
        top="0"
        justifyContent="space-between"
        flex="1"
      >
        <Box>
          <Box p="4">
            <Logo />
          </Box>
          <Stack as="nav" px={4} pb={8}>
            <NavLink to="/">
              <TextWithIcon title="Dashboard" Icon={MdDashboard}></TextWithIcon>
            </NavLink>
            <NavLink to="/schedule">
              <TextWithIcon title="Schedule" Icon={MdCalendarMonth}></TextWithIcon>
            </NavLink>
            <NavLink to="/employees">
              <TextWithIcon title="Employees" Icon={MdPeopleAlt}></TextWithIcon>
            </NavLink>
            <NavLink to="/notes">
              <TextWithIcon title="Notes" Icon={MdNotes}></TextWithIcon>
            </NavLink>
          </Stack>
        </Box>
        <Box p={4}>
          <NavFooter />
        </Box>
      </Stack>
      <VStack w="full">
        <TopBarLayout FirstName="John" LastName="Doe" Role="Admin" />
        <Box flex={1} w="full">
          {children}
        </Box>
      </VStack>
    </Flex>
  );
};
