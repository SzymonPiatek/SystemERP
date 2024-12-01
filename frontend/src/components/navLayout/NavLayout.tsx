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
  console.log(user);

  return (
    <Flex background="gray.100" p={0} minH="100vh">
      {/* Left Menu */}
      <Stack
        as="aside"
        background="white"
        minWidth={[null, '15%', '13%']}
        maxWidth={[null, '15%', '13%']}
        minH="100vh"
        position="fixed"
        left="0"
        top="0"
        justifyContent="space-between"
        flex="1"
      >
        <Box>
          <Box p="4">
            <Logo />
          </Box>
          <Stack as="nav" px={4} pb={8} mt="2">
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
            <NavLink to="/orders">
              <TextWithIcon title="Orders" Icon={MdChecklist}></TextWithIcon>
            </NavLink>
          </Stack>
        </Box>
        <Box p={4}>
          <NavFooter />
        </Box>
      </Stack>

      <VStack w="full" ml={[null, '15%', '13%']}>
        <TopBarLayout
          FirstName={user!.firstName}
          LastName={user!.lastName}
          Role={user!.profile!.role!.name}
        />
        <Box flex={1} w="full">
          {children}
        </Box>
      </VStack>
    </Flex>
  );
};
