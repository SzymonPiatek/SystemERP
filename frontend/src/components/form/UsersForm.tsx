import { Button, Card, IconButton, Input } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import {
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogCloseTrigger,
  DialogTitle,
  DialogActionTrigger,
} from '../../components/ui/dialog';
import 'react-datepicker/dist/react-datepicker.css';
import { MdClose, MdEdit } from 'react-icons/md';
import { Field } from '../ui/field';
import { User } from '../../utils/types';

type UserFormProps = {
  user: User;
  onEdit: (props: any) => void;
};

export const UsersForm: FC<UserFormProps> = ({ user, onEdit }) => {
  const { firstName, lastName, email } = user;
  const [open, setOpen] = useState(false);
  const [updatedUser, setUpdatedUser] = useState<{
    firstName: string;
    lastName: string;
    email: string;
  }>({
    firstName,
    lastName,
    email,
  });

  useEffect(() => {
    if (open) {
      setUpdatedUser({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
    }
  }, [open, user]);

  const handleOpenChange = (e: { open: boolean }) => {
    setOpen(e.open);
  };

  const handleInputChange =
    (field: keyof typeof updatedUser) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setUpdatedUser((prevUser) => ({
        ...prevUser,
        [field]: e.target.value,
      }));
    };

  const handleSave = async () => {
    try {
      await onEdit({ updatedUser, id: user.id });
      setOpen(false);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <DialogRoot lazyMount open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger>
        <IconButton variant="outline">
          <MdEdit />
        </IconButton>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>

        <DialogBody>
          <Card.Root>
            <Card.Body gap="2">
              <Field label="First Name" required>
                <Input
                  value={updatedUser.firstName}
                  onChange={handleInputChange('firstName')}
                  placeholder="Enter first name"
                />
              </Field>

              <Field label="Last Name" required>
                <Input
                  value={updatedUser.lastName}
                  onChange={handleInputChange('lastName')}
                  placeholder="Enter last name"
                />
              </Field>

              <Field label="Email" required>
                <Input
                  value={updatedUser.email}
                  onChange={handleInputChange('email')}
                  placeholder="Enter email"
                />
              </Field>
            </Card.Body>
          </Card.Root>
        </DialogBody>

        <DialogFooter>
          <DialogActionTrigger>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
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
