import { Box } from '@chakra-ui/react';
import { FC } from 'react';
import { NavLayout } from '../components/navLayout/NavLayout.tsx';
import { Outlet } from 'react-router-dom';

export const HomePage: FC<{}> = () => {
  return (
    <NavLayout>
      <Box color="black" p="4" minH="full" bg={{ base: 'gray.50', _dark: 'gray.800' }}>
        <Outlet />
      </Box>
    </NavLayout>
  );
};
