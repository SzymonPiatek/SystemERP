import { Box } from '@chakra-ui/react';
import { FC } from 'react';
import { NavLayout } from '../components/navLayout/NavLayout.tsx';
import { Outlet } from 'react-router-dom';

export const HomePage: FC<{}> = () => {
  return (
    <Box w="100vw" h="100vh" overflow="hidden">
      <NavLayout>
        <Box flex="1" color="black" p="4" bg={{ base: 'gray.50', _dark: 'gray.800' }} minH="full">
          <Outlet />
        </Box>
      </NavLayout>
    </Box>
  );
};
