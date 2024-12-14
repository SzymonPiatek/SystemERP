import { FC } from 'react';
import { Box, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export type LogoProps = {};

export const Logo: FC<LogoProps> = (props) => {
  return (
    <Link to="/">
      <Box {...props}>
        <Image
          src="../../../public/fullLogo.png"
          alt="Full Logo"
          display={{ base: 'none', xl: 'block' }}
          style={{ padding: '0.5rem' }}
        />
        <Image
          src="../../../public/logo.png"
          alt="Small Logo"
          display={{ base: 'block', xl: 'none' }}
          style={{ padding: '1.5rem' }}
        />
      </Box>
    </Link>
  );
};
