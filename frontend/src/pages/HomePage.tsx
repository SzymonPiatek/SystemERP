import { GridItem, Grid } from '@chakra-ui/react';
import { FC } from 'react';
import { NavLayout } from '../components/navLayout/NavLayout.tsx';
import { Outlet } from 'react-router-dom';
import { TopBarLayout } from '../components/topBarLayout/TopBarLayout.tsx';

export const HomePage: FC<{}> = () => {
  return (
    <Grid
      templateRows="auto 1fr"
      templateColumns={{ base: '80px 1fr', lg: '200px 1fr' }}
      height="100vh"
    >
      <GridItem as="header" colSpan={2}>
        <TopBarLayout />
      </GridItem>

      <GridItem as="nav">
        <NavLayout />
      </GridItem>

      <GridItem as="main" p="4" overflowY="auto" bg={{ base: 'gray.50', _dark: 'gray.800' }}>
        <Outlet />
      </GridItem>
    </Grid>
  );
};
