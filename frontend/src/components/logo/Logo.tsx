import { FC } from 'react';
import { Box, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export type LogoProps = {};

export const Logo: FC<LogoProps> = (props) => {
  return (
    <Link to="/">
      <Box {...props}>
        <Image src="../../../public/logo.png" alt="Logo" />
      </Box>
    </Link>
  );
};
