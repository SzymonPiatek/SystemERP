import { FC, useState } from 'react';
import ClientFormWrapper from '../../components/form/formWrapper/ClientFormWrapper.tsx';
import { Box, Heading, Input, Grid, GridItem, Field } from '@chakra-ui/react';
import { useLoginUser } from '../../hooks/useLoginUser.tsx';
import CustomButton from '../../components/button/CustomButton.tsx';
import { Logo } from '../../components/logo/Logo.tsx';
import { PasswordInput } from '../../components/ui/password-input.tsx';

export const LoginPage: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const { mutate } = useLoginUser();

  const handleLogin = async () => {
    mutate({ email, password });
  };

  return (
    <Grid
      templateColumns={{ base: '1fr', lg: '1fr 1fr' }}
      width="100dvw"
      height="100dvh"
      gap="0"
      alignItems="center"
      justifyContent="center"
    >
      {/* Logo */}
      <GridItem justifyContent="center" alignItems="center" display={{ base: 'none', lg: 'flex' }}>
        <Logo />
      </GridItem>

      {/* Login form */}
      <GridItem display="flex" justifyContent="center">
        <Box width="100%" maxWidth="400px" display="flex" flexDirection="column" gap="2rem">
          <Box width="100%" display="flex" justifyContent="center">
            <Heading size="3xl">Login</Heading>
          </Box>
          <ClientFormWrapper onSubmit={handleLogin}>
            <Box display="flex" flexDirection="column" gap="1rem">
              <Field.Root>
                <Field.Label>Email</Field.Label>
                <Input
                  type="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="me@example.com"
                />
              </Field.Root>
              <Field.Root>
                <Field.Label>Password</Field.Label>
                <PasswordInput
                  type="password"
                  name="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </Field.Root>
              <Box width="100%" display="flex" justifyContent="center" marginTop="1rem">
                <CustomButton type="submit" variant="primary">
                  Sign in
                </CustomButton>
              </Box>
            </Box>
          </ClientFormWrapper>
        </Box>
      </GridItem>
    </Grid>
  );
};
