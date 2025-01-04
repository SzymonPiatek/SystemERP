import { Card, Grid, GridItem, Text, Box, Icon } from '@chakra-ui/react';
import { FC, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext.tsx';
import { Avatar } from '../components/ui/avatar.tsx';
import {
  FileUploadList,
  FileUploadRoot,
  FileUploadTrigger,
} from '../components/ui/file-upload.tsx';
import { MdCameraAlt } from 'react-icons/md';

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
                <Box
                  position="relative"
                  w="150px"
                  h="150px"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  _hover={{
                    '& .avatar': {
                      opacity: 0.3,
                    },
                    '& .icon': {
                      opacity: 1,
                    },
                    cursor: 'pointer',
                  }}
                >
                  <Avatar
                    className="avatar"
                    name={user?.firstName}
                    w="full"
                    h="full"
                    transition="opacity 0.3s ease-in-out"
                  />
                  <Box
                    className="icon"
                    position="absolute"
                    color="white"
                    opacity={0}
                    fontSize="3xl"
                    transition="opacity 0.3s ease-in-out"
                  >
                    <MdCameraAlt />
                  </Box>
                </Box>
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
