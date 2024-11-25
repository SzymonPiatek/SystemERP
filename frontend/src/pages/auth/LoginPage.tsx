import { FC, useState } from 'react';
import ClientFormWrapper from '../../components/form/formWrapper/ClientFormWrapper.tsx';
import { Box } from '@chakra-ui/react';
import { useLoginUser } from '../../hooks/useLoginUser.tsx';

export const LoginPage: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const { mutate, isPending } = useLoginUser();

  const handleLogin = async () => {
    mutate({ email, password });
  };

  return (
    <Box>
      <h2>Login</h2>
      <ClientFormWrapper onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </ClientFormWrapper>
    </Box>
  );
};
