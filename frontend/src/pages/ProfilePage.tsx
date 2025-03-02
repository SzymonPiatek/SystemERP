import { Card, Grid, GridItem, Text, Box, Button } from '@chakra-ui/react';
import { FC, useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext.tsx';
import { Avatar } from '../components/ui/avatar.tsx';
import {
  FileUploadList,
  FileUploadRoot,
  FileUploadTrigger,
} from '../components/ui/file-upload.tsx';
import { MdCameraAlt } from 'react-icons/md';
import { ChangePassword } from '../components/profile/ChangePassword.tsx';
import { useChangePic } from '../hooks/users/useUsers.tsx';
import { toaster } from '../components/ui/toaster.tsx';

export const ProfilePage: FC<{}> = () => {
  const { user } = useContext(AuthContext);
  const { mutate } = useChangePic();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!user) {
      toaster.create({ description: 'No authenticated user', type: 'error' });
      return;
    }

    setSelectedFile(file);
  };

  const handleSave = () => {
    if (selectedFile && user) {
      mutate({ updatedUser: selectedFile, id: user.id });
      setSelectedFile(null);
    }
  };
  console.log(user?.profile);
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
            <FileUploadRoot justifyContent="center" alignItems="center" onChange={handleFileChange}>
              <FileUploadTrigger>
                <Box
                  position="relative"
                  w="150px"
                  h="150px"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  _hover={{
                    '& .avatar': { opacity: 0.3 },
                    '& .icon': { opacity: 1 },
                    cursor: 'pointer',
                  }}
                >
                  <Avatar
                    className="avatar"
                    name={user?.firstName}
                    src={user?.profile?.profilePicBase64 ?? ''}
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

        {selectedFile && (
          <Box mt="4">
            <Button onClick={handleSave} variant="outline">
              Save
            </Button>
          </Box>
        )}

        <ChangePassword />
      </Card.Body>
    </Card.Root>
  );
};
