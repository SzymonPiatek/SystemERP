import { Box } from '@chakra-ui/react';
import { FC } from 'react';
import { NavLayout } from '../components/NavLayout';
import { Outlet } from 'react-router-dom';

export const HomePage: FC<{}> = () => {
  return (
    <NavLayout>
      <Outlet />
    </NavLayout>
  );
};
