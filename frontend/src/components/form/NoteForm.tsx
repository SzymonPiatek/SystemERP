import { Box, Button, Input, Text } from '@chakra-ui/react';
import { FC, useState } from 'react';
import { useEditNote } from '../../hooks/useEditNote';

type NoteFormProps = {
  title: string;
  description: string;
  id: number;
  onClose: () => void;
  fetchData: () => void;
};

export const NoteForm: FC<NoteFormProps> = ({ title, description, id, onClose, fetchData }) => {
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedDescription, setUpdatedDescription] = useState(description);

  const { mutate: editNote } = useEditNote(fetchData);

  const handleSave = async () => {
    const payload = {
      title: updatedTitle,
      description: updatedDescription,
    };

    editNote({ noteId: id, data: payload });
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
      <Button colorScheme="blue" onClick={handleSave}>
        Save
      </Button>
    </Box>
  );
};
