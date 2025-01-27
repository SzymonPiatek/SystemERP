import { Card, Grid, GridItem, Text } from '@chakra-ui/react';
import { FC, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Avatar } from '../ui/avatar';

export const UserCard: FC<{}> = () => {
  const { user } = useContext(AuthContext);
  return (
    <Card.Root rounded="2xl" pl="2" pr="2">
      <Card.Body>
        <Grid templateRows="repeat(2, 1fr)" templateColumns="repeat(3, 1fr)">
          <GridItem rowSpan={2} colSpan={1} pr="4">
            <Avatar src={user?.profile?.profilePicBase64} w="120px" h="120px"></Avatar>
          </GridItem>
          <GridItem rowSpan={1} colSpan={2} alignContent="center">
            <Text textStyle="xl">
              {user?.firstName} {user?.lastName}
            </Text>
            <Text textStyle="xs">{user?.profile?.role?.name}</Text>
          </GridItem>
          <Grid templateRows="repeat(1, 1fr)" templateColumns="repeat(2, 1fr)" gapX={2}>
            <GridItem rowSpan={1} colSpan={1}>
              <Text>{user?.email}</Text>
            </GridItem>
          </Grid>
        </Grid>
      </Card.Body>
    </Card.Root>
  );
};
