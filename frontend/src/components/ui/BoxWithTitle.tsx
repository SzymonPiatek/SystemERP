import { FC, ReactNode } from 'react';
import { Box, Flex } from '@chakra-ui/react';

type BoxProps = {
  Title?: String;
  Text?: String;
  Action?: ReactNode;
};

export const BoxWithTitle: FC<BoxProps> = (props) => {
  return (
    <Flex p="4" justify="space-between">
      <Box>
        <Box mt="1" lineHeight="tight" fontSize="xl">
          {props.Title}
        </Box>
        <Box as="span" color="gray.600" fontSize="sm">
          {props.Text}
        </Box>
      </Box>

      <Box>{props.Action}</Box>
    </Flex>
  );
};
