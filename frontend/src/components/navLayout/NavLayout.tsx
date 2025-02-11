import { Box, Stack, Flex } from '@chakra-ui/react';
import { FC, PropsWithChildren } from 'react';
import { MdDashboard, MdCalendarMonth, MdPeopleAlt, MdNotes, MdChecklist } from 'react-icons/md';
import { NavLink } from './NavLink.tsx';
import { TextWithIcon } from './TextWithIcon';
import NavFooter from './NavFooter.tsx';

export type NavLayoutProps = PropsWithChildren<{}>;

export const NavLayout: FC<NavLayoutProps> = () => {
  return (
    <Flex direction="column" height="100%">
      <Stack mx={4} flex="1">
        <NavLink to="/">
          <TextWithIcon title="Dashboard" Icon={MdDashboard} />
        </NavLink>
        <NavLink to="/schedule">
          <TextWithIcon title="Schedule" Icon={MdCalendarMonth} />
        </NavLink>
        <NavLink to="/users">
          <TextWithIcon title="Users" Icon={MdPeopleAlt} />
        </NavLink>
        <NavLink to="/notes">
          <TextWithIcon title="Notes" Icon={MdNotes} />
        </NavLink>
        <NavLink to="/orders">
          <TextWithIcon title="Orders" Icon={MdChecklist} />
        </NavLink>
      </Stack>
      <Box mt="auto">
        <NavFooter />
      </Box>
    </Flex>
  );
};
