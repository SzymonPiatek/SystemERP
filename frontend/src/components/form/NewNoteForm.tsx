import { Box, Button, Input, Text } from '@chakra-ui/react';
import { FC, useState } from 'react';
import { useAddNote } from '../../hooks/useAddNote';

type NoteFormProps = {
  onClose: () => void;
  fetchData: () => void;
  ownerId: number;
};

export const NewNoteForm: FC<NoteFormProps> = ({ onClose, fetchData, ownerId }) => {
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');

  const { mutate: addNote } = useAddNote(fetchData);

  const handleAdd = async () => {
    const payload = {
      title: updatedTitle,
      description: updatedDescription,
      ownerId: ownerId,
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
