import { Box, Card, Grid, GridItem, Text } from '@chakra-ui/react';
import { FC, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext.tsx';
import { Avatar } from '../components/ui/avatar.tsx';
import {
  FileUploadList,
  FileUploadRoot,
  FileUploadTrigger,
} from '../components/ui/file-upload.tsx';

export const ProfilePage: FC<{}> = () => {
  const { user } = useContext(AuthContext);
  return (
    <Card.Root>
      <Card.Body p="12">
        <Card.Title>Profile</Card.Title>
        <Grid
          h="200px"
          templateRows="repeat(1, 1fr)"
          templateColumns="repeat(5, 1fr)"
          gap={4}
          alignItems="center"
        >
          <GridItem colSpan={1} display="flex">
            <FileUploadRoot justifyContent="center" alignItems="center">
              <FileUploadTrigger>
                <Avatar w="150px" h="150px" name={user?.firstName} />
              </FileUploadTrigger>
              <FileUploadList />
            </FileUploadRoot>
          </GridItem>
          <GridItem colSpan={4}>
            <Text>First name: {user?.firstName}</Text>
            <Text>Last name: {user?.lastName}</Text>
            <Text>Email: {user?.email}</Text>
          </GridItem>
        </Grid>
      </Card.Body>
    </Card.Root>
  );
};
