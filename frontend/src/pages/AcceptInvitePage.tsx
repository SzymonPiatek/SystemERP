import { Button, Card, Text, Flex, Field } from '@chakra-ui/react';
import { Logo } from '../components/logo/Logo';
import { PasswordInput } from '../components/ui/password-input.tsx';
import { useAcceptInvite } from '../hooks/users/useUsers.tsx';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ClientFormWrapper from '../components/form/formWrapper/ClientFormWrapper.tsx';
import { toaster } from '../components/ui/toaster.tsx';

function AcceptInvitePage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';

  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const { mutate } = useAcceptInvite();

  const handleAcceptInvite = async () => {
    if (password !== confirmPassword) {
      toaster.create({
        title: 'Error',
        description: `Passwords doesn't match`,
        type: 'error',
      });

      return;
    }
    mutate({ accept: { token, password } });
    console.log({ accept: { token, password } });
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
          <Text my={4} fontSize="2xl">
            Hello
          </Text>
          <Text color="gray.400">
            You have been invited to join on our platform.
            <br /> Set the password and click the button below to accept the invitation:
          </Text>
          <ClientFormWrapper onSubmit={handleAcceptInvite}>
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
              Accept Invite
            </Button>
          </ClientFormWrapper>
        </Card.Body>
      </Card.Root>
    </Flex>
  );
}

export default AcceptInvitePage;
