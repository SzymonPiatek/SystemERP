import { FC } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export type LogoProps = {};

export const Logo: FC<LogoProps> = (props) => {
  return (
    <Link to="/">
      <Box {...props}>
        <Text
          fontWeight="700"
          textTransform="uppercase"
          lineHeight="1"
          color="gray.700"
          textStyle={{ base: 'xs', lg: 'md' }}
        >
          System ERP
          <br />
          <small>Manager</small>
        </Text>
      </Box>
    </Link>
  );
};
