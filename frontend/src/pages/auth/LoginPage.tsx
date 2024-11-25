import { FC, useState } from 'react';
import ClientFormWrapper from '../../components/form/formWrapper/ClientFormWrapper.tsx';
import { Box, Button, Heading, Input } from '@chakra-ui/react';
import { useLoginUser } from '../../hooks/useLoginUser.tsx';

export const LoginPage: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const { mutate, isPending } = useLoginUser();

  const handleLogin = async () => {
    mutate({ email, password });
  };

  return (
    <Box
      width="100dvw"
      height="100dvh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      background="gray.100"
    >
      <Box width="100%" maxWidth="400px" display="flex" flexDirection="column" gap="2rem">
        <Box width="100%" display="flex" justifyContent="center">
          <Heading size="4xl" color="black">
            Logowanie
          </Heading>
        </Box>
        <ClientFormWrapper onSubmit={handleLogin}>
          <Box display="flex" flexDirection="column" gap="1rem">
            <Input
              type="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              color="black"
              _focus={{
                borderColor: 'black',
                borderWidth: '2px',
              }}
            />
            <Input
              type="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              color="black"
              _focus={{
                borderColor: 'black',
                borderWidth: '2px',
              }}
            />
            <Button
              marginTop="1rem"
              type="submit"
              color="white"
              bg="green.600"
              _hover={{
                bg: 'green.700',
              }}
            >
              Zaloguj się
            </Button>
          </Box>
        </ClientFormWrapper>
      </Box>
    </Box>
  );
};
