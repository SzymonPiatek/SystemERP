import { Button, Card, IconButton, Input } from '@chakra-ui/react';
import { FC, useContext, useState } from 'react';
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
import { MdClose, MdEdit } from 'react-icons/md';
import { Field } from '../ui/field';
import { AuthContext } from '../../contexts/AuthContext.tsx';
import { useChangePassword } from '../../hooks/users/useUsers';
import { toaster } from '../ui/toaster.tsx';
type ChangePasswordProps = {};

export const ChangePassword: FC<ChangePasswordProps> = () => {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const { user } = useContext(AuthContext);
  const { mutate } = useChangePassword();
  const handleOpenChange = (e: { open: boolean }) => {
    setOpen(e.open);
  };

  const handleSave = () => {
    if (!user) {
      toaster.create({
        description: 'No auth user',
        type: 'error',
      });
      return;
    }
    if (password !== confirmPassword) {
      toaster.create({
        title: 'Error',
        description: `Passwords doesn't match`,
        type: 'error',
      });

      return;
    }
    mutate({ updatedUser: { oldPassword, newPassword: password }, id: user?.id });

    setOpen(false);
  };

  return (
    <DialogRoot lazyMount open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger>
        <IconButton variant="outline">
          <MdEdit /> Change Password
        </IconButton>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
        </DialogHeader>

        <DialogBody>
          <Card.Root>
            <Card.Body gap="2">
              <Field label="New Password" required>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
                />
              </Field>

              <Field label="Confirm New Password" required>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                />
              </Field>

              <Field label="Old Password" required>
                <Input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Enter old password"
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
          <Button onClick={handleSave} disabled={!password || !confirmPassword || !oldPassword}>
            Save
          </Button>
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
