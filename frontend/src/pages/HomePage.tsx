import { Box } from '@chakra-ui/react';
import { FC } from 'react';
import { NavLayout } from '../components/navLayout/NavLayout.tsx';
import { Outlet } from 'react-router-dom';

export const HomePage: FC<{}> = () => {
  return (
    <NavLayout>
      <Box color="black" p="4" minH="full">
        <Outlet />
      </Box>
    </NavLayout>
  );
};
