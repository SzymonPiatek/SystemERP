import { FC, useState } from 'react';
import ClientFormWrapper from '../../components/form/formWrapper/ClientFormWrapper.tsx';
import { Box, Heading } from '@chakra-ui/react';
import { useLoginUser } from '../../hooks/useLoginUser.tsx';
import CustomInput from '../../components/input/CustomInput.tsx';
import CustomButton from '../../components/button/CustomButton.tsx';

export const LoginPage: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const { mutate } = useLoginUser();

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
          <Heading size="3xl" color="black">
            Login
          </Heading>
        </Box>
        <ClientFormWrapper onSubmit={handleLogin}>
          <Box display="flex" flexDirection="column" gap="1rem">
            <CustomInput
              type="email"
              name="email"
              required
              value={email}
              onChange={(value) => setEmail(value as string)}
              placeholder="Email"
            />
            <CustomInput
              type="password"
              name="password"
              required
              value={password}
              onChange={(value) => setPassword(value as string)}
              placeholder="Password"
            />
            <Box width="100%" display="flex" justifyContent="center" marginTop="1rem">
              <CustomButton type="submit" variant="primary">
                Sign in
              </CustomButton>
            </Box>
          </Box>
        </ClientFormWrapper>
      </Box>
    </Box>
  );
};
