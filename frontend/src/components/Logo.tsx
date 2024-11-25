import { FC } from 'react';
import { Box, Text } from '@chakra-ui/react';

export type LogoProps = {};

export const Logo: FC<LogoProps> = (props) => {
  return (
    <Box {...props}>
      <Text fontWeight="700" textTransform="uppercase" lineHeight="1" color="gray.700">
        System ERP
        <br />
        <small>Manager</small>
      </Text>
    </Box>
  );
};
