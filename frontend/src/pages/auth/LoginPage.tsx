import { FC, useState } from 'react';
import ClientFormWrapper from '../../components/form/formWrapper/ClientFormWrapper.tsx';
import { Box } from '@chakra-ui/react';
import { login } from '../../actions/authActions.ts';

export const LoginPage: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async () => {
    const loginResponse = await login({ email, password });
    console.log(loginResponse);
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
