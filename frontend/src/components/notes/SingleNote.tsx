import { Box, HStack } from '@chakra-ui/react';
import { FC } from 'react';
import { BoxWithTitle } from '../ui/BoxWithTitle';
import { Button } from '../ui/button';

import { MdEdit, MdDelete } from 'react-icons/md';

export type SingleNoteProps = { title: string; desc: string };

export const SingleNote: FC<SingleNoteProps> = (props) => {
  const { title, desc } = props;

  return (
    <Box bg="white" rounded="2xl" p="4" m="4" maxW="30%">
      <BoxWithTitle Title={title} Text={desc} />
      <HStack gap="0" m="4" justifyContent="end" alignItems="center">
        <Box>
          <Button
            _hover={{
              color: 'green.700',
            }}
          >
            <MdEdit />
          </Button>
          <Button
            _hover={{
              color: 'green.700',
            }}
          >
            <MdDelete />
          </Button>
        </Box>
      </HStack>
    </Box>
  );
};
