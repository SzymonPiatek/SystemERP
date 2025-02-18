import { Box, Button, Card, Input, Field, Text } from '@chakra-ui/react';
import { FC, useState } from 'react';
import {
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogBody,
  DialogFooter,
  DialogActionTrigger,
} from '../../components/ui/dialog';

import { useForgotPassword } from '../../hooks/users/useUsers';
import { Logo } from '../logo/Logo';

type ForgotPasswordProps = {};

export const ForgotPassword: FC<ForgotPasswordProps> = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');

  const handleOpenChange = (e: { open: boolean }) => {
    setOpen(e.open);
  };
  const { mutate } = useForgotPassword();

  const handleForgotPassword = async () => {
    mutate({ email: email });
  };

  return (
    <DialogRoot lazyMount open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger>
        <Button variant="plain" size="xs">
          Forgot password?
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogBody>
          <Card.Root>
            <Card.Body>
              <Box p={4}>
                <Box display="flex" flexDirection="column" gap="1rem">
                  <Logo />
                  <Text fontSize="xl" alignSelf="center">
                    Reset your password
                  </Text>
                  <Text>
                    Enter your user account's verified email address and we will send you a password
                    reset link.
                  </Text>
                  <Field.Root>
                    <Input
                      type="email"
                      name="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                    />
                  </Field.Root>
                  <Button variant="outline" onClick={handleForgotPassword}>
                    Send Mail
                  </Button>
                </Box>
              </Box>
            </Card.Body>
          </Card.Root>
        </DialogBody>

        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </DialogActionTrigger>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};
