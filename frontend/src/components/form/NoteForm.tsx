import { Button, Card, IconButton, Input } from '@chakra-ui/react';
import { FC, useState } from 'react';
import { MdClose, MdEdit } from 'react-icons/md';
import {
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogTitle,
  DialogActionTrigger,
  DialogCloseTrigger,
} from '../../components/ui/dialog';
import { useEditNote } from '../../hooks/notes/useNote';
import { Field } from '../ui/field';

type NoteFormProps = {
  title: string;
  description: string;
  id: number;
};

export const NoteForm: FC<NoteFormProps> = ({ title, description, id }) => {
  const [open, setOpen] = useState(false);
  const [updatedNote, setUpdatedNote] = useState<{
    title: string;
    description: string;
  }>({
    title,
    description,
  });

  const { mutate: editNote } = useEditNote();

  const handleOpenChange = (e: { open: boolean }) => {
    setOpen(e.open);
  };

  const handleInputChange =
    (field: keyof typeof updatedNote) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setUpdatedNote((prevNote) => ({
        ...prevNote,
        [field]: e.target.value,
      }));
    };

  const handleSave = async () => {
    try {
      const payload = {
        updatedNote,
        id,
      };
      await editNote(payload);
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  return (
    <DialogRoot lazyMount open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger>
        <IconButton variant="outline" onClick={() => setOpen(true)}>
          <MdEdit />
        </IconButton>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Note</DialogTitle>
        </DialogHeader>

        <DialogBody>
          <Card.Root>
            <Card.Body gap="2">
              <Field label="Title" required>
                <Input
                  value={updatedNote.title}
                  onChange={handleInputChange('title')}
                  placeholder="Enter title"
                />
              </Field>

              <Field label="Description" required>
                <Input
                  value={updatedNote.description}
                  onChange={handleInputChange('description')}
                  placeholder="Enter description"
                />
              </Field>
            </Card.Body>
          </Card.Root>
        </DialogBody>

        <DialogFooter>
          <DialogActionTrigger>
            <Button variant="outline">Cancel</Button>
          </DialogActionTrigger>

          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>

        <DialogCloseTrigger>
          <IconButton variant="outline">
            <MdClose />
          </IconButton>
        </DialogCloseTrigger>
      </DialogContent>
    </DialogRoot>
  );
};
