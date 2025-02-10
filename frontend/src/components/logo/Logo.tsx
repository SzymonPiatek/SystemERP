import { FC } from 'react';
import { Box, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useColorMode } from '../ui/color-mode';

export type LogoProps = {};

export const Logo: FC<LogoProps> = (props) => {
  const { colorMode } = useColorMode();

  return (
    <Box {...props} display="flex" alignItems="center" justifyContent="center" height="100%">
      <Link to="/">
        {/* Logo */}
        <Image
          src={colorMode === 'light' ? '/fullLogo.png' : '/fullLogoLight.png'}
          alt="Full Logo"
          display={{ base: 'none', lg: 'block' }}
          maxW="100%"
          maxH="100%"
          fit="contain"
        />
        {/* Small screen logo */}
        <Image
          src="/logo.png"
          alt="Small Logo"
          display={{ base: 'block', lg: 'none' }}
          maxW="100%"
          maxH="100%"
          fit="contain"
        />
      </Link>
    </Box>
  );
};
