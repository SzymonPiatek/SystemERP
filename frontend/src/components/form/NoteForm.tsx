import { Box, Button, Input, Text } from '@chakra-ui/react';
import { FC, useState } from 'react';
import { editNote } from '../../actions/noteActions';

type NoteFormProps = {
  title: string;
  description: string;
  id: number;
  onClose: () => void;
};

export const NoteForm: FC<NoteFormProps> = ({ title, description, id, onClose }) => {
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedDescription, setUpdatedDescription] = useState(description);

  const handleSave = async () => {
    const payload = {
      title: updatedTitle,
      description: updatedDescription,
    };

    try {
      await editNote(id, payload);
      onClose();
    } catch (error) {
      console.error('Error updating note:', error);
    }
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
