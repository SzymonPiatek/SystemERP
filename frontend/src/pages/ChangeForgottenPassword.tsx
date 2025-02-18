import { Button, Card, Text, Flex, Field } from '@chakra-ui/react';
import { Logo } from '../components/logo/Logo';
import { PasswordInput } from '../components/ui/password-input.tsx';
import { useResetPassword } from '../hooks/users/useUsers.tsx';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ClientFormWrapper from '../components/form/formWrapper/ClientFormWrapper.tsx';
import { toaster } from '../components/ui/toaster.tsx';

function ChangeForgottenPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';

  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const { mutate } = useResetPassword();

  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      toaster.create({
        title: 'Error',
        description: `Passwords doesn't match`,
        type: 'error',
      });

      return;
    }
    mutate({ token, newPassword: password });
  };

  return (
    <Flex
      w="100vw"
      h="100vh"
      align="center"
      justify="center"
      bgGradient="to-br"
      gradientFrom="red.800"
      gradientTo="black"
    >
      <Card.Root width="xl" p={6} textAlign="center">
        <Card.Body>
          <Logo />
          <Text color="gray.400">
            You requested to reset your password.
            <br /> Insert new password below.
          </Text>
          <ClientFormWrapper onSubmit={handleResetPassword}>
            <Field.Root pb="4">
              <PasswordInput
                type="password"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </Field.Root>
            <Field.Root>
              <PasswordInput
                type="password"
                name="confirmPassword"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
              />
            </Field.Root>
            <Button variant="outline" mt={4} type="submit">
              Change Password
            </Button>
          </ClientFormWrapper>
        </Card.Body>
      </Card.Root>
    </Flex>
  );
}

export default ChangeForgottenPassword;
