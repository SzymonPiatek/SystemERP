import { Box, Button, Input, Text } from '@chakra-ui/react';
import { FC, useContext, useState } from 'react';
import { useAddNote } from '../../hooks/useAddNote';
import { AuthContext } from '../../contexts/AuthContext';

type NoteFormProps = {
  onClose: () => void;
  fetchData: () => void;
};

export const NewNoteForm: FC<NoteFormProps> = ({ onClose, fetchData }) => {
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');

  const { mutate: addNote } = useAddNote(fetchData);
  const { user } = useContext(AuthContext);

  const handleAdd = async () => {
    const payload = {
      title: updatedTitle,
      description: updatedDescription,
      ownerId: user?.id,
    };

    addNote({ data: payload });
    onClose();
  };

  return (
    <Box minW="30vw">
      <Box mb={4}>
        <Text fontSize="sm" fontWeight="bold" mb={2}>
          Title
        </Text>
        <Input
          value={updatedTitle}
          onChange={(e) => setUpdatedTitle(e.target.value)}
          placeholder="Enter title"
        />
      </Box>
      <Box mb={4}>
        <Text fontSize="sm" fontWeight="bold" mb={2}>
          Description
        </Text>
        <Input
          value={updatedDescription}
          onChange={(e) => setUpdatedDescription(e.target.value)}
          placeholder="Enter description"
        />
      </Box>
      <Button colorScheme="blue" onClick={handleAdd}>
        Add
      </Button>
    </Box>
  );
};
