import { Button, Card, IconButton, Input } from '@chakra-ui/react';
import { FC, useState } from 'react';
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
import { MdClose, MdAddCircleOutline } from 'react-icons/md';
import { Field } from '../ui/field';
import { useRegisterUser } from '../../hooks/users/useUsers';

type RegisterUserForm = {};

export const NewUserForm: FC<RegisterUserForm> = () => {
  const [open, setOpen] = useState(false);
  const [newUser, setNewUser] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleOpenChange = (e: { open: boolean }) => {
    setOpen(e.open);
  };
  const { mutate: registerUser } = useRegisterUser();

  const handleInputChange =
    (field: keyof typeof newUser) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewUser((prevUser) => ({
        ...prevUser,
        [field]: e.target.value,
      }));
    };

  const handleSave = async () => {
    if (!newUser.firstName || !newUser.lastName || !newUser.email || !newUser.password) {
      console.error('Please fill in all fields');
      return;
    }

    try {
      await registerUser({ newUser });
      setNewUser({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      });
      setOpen(false);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <DialogRoot lazyMount open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger>
        <IconButton variant="outline" p="2">
          <MdAddCircleOutline /> Add User
        </IconButton>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New User</DialogTitle>
        </DialogHeader>

        <DialogBody>
          <Card.Root>
            <Card.Body gap="2">
              <Field label="First Name" required>
                <Input
                  value={newUser.firstName}
                  onChange={handleInputChange('firstName')}
                  placeholder="Enter first name"
                />
              </Field>

              <Field label="Last Name" required>
                <Input
                  value={newUser.lastName}
                  onChange={handleInputChange('lastName')}
                  placeholder="Enter last name"
                />
              </Field>

              <Field label="Email" required>
                <Input
                  value={newUser.email}
                  onChange={handleInputChange('email')}
                  placeholder="Enter email"
                />
              </Field>
            </Card.Body>
          </Card.Root>
        </DialogBody>

        <DialogFooter>
          <DialogActionTrigger asChild>
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
