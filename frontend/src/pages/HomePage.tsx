import { FC } from 'react';
import { NavLayout } from '../components/navLayout/NavLayout.tsx';
import { Outlet } from 'react-router-dom';

export const HomePage: FC<{}> = () => {
  return (
    <NavLayout>
      <Outlet />
    </NavLayout>
  );
};
