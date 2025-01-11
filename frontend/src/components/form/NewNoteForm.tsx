import { Button, Card, IconButton, Input } from '@chakra-ui/react';
import { FC, useState, useContext, useEffect } from 'react';
import { MdAddCircleOutline, MdClose } from 'react-icons/md';
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
} from '../ui/dialog.tsx';
import { useAddNote } from '../../hooks/notes/useNotes';
import { Field } from '../ui/field';
import { AuthContext } from '../../contexts/AuthContext';

type NewNoteFormProps = {};

export const NewNoteForm: FC<NewNoteFormProps> = () => {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [newNote, setNewNote] = useState<{
    title: string;
    description: string;
  }>({
    title: '',
    description: '',
  });

  const { mutate: addNote } = useAddNote();

  const handleOpenChange = (e: { open: boolean }) => {
    setOpen(e.open);
  };

  const handleInputChange =
    (field: keyof typeof newNote) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewNote((prevNote) => ({
        ...prevNote,
        [field]: e.target.value,
      }));
    };

  const handleSave = async () => {
    if (!user?.id) {
      return;
    }

    try {
      const payload = {
        ownerId: user?.id,
        title: newNote.title,
        description: newNote.description,
      };
      await addNote({ newNote: payload });
      setOpen(false);
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  useEffect(() => {
    if (!open) {
      setNewNote({ title: '', description: '' });
    }
  }, [open]);

  return (
    <DialogRoot lazyMount open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger>
        <IconButton variant="outline" onClick={() => setOpen(true)} p="2">
          <MdAddCircleOutline /> Add Note
        </IconButton>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Note</DialogTitle>
        </DialogHeader>

        <DialogBody>
          <Card.Root>
            <Card.Body gap="2">
              <Field label="Title" required>
                <Input
                  value={newNote.title}
                  onChange={handleInputChange('title')}
                  placeholder="Enter title"
                />
              </Field>

              <Field label="Description" required>
                <Input
                  value={newNote.description}
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
