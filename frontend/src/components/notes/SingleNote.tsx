import { Box, HStack, Badge } from '@chakra-ui/react';
import { FC } from 'react';
import { BoxWithTitle } from '../ui/BoxWithTitle';
import { Button } from '../ui/button';

import { MdEdit, MdDelete } from 'react-icons/md';

export type SingleNoteProps = { title: string; status: boolean; desc: string };

export const SingleNote: FC<SingleNoteProps> = (props) => {
  const { title, status, desc } = props;

  return (
    <Box bg="white" rounded="2xl" p="4" m="4" maxW="30%">
      <BoxWithTitle Title={title} Text={desc} />
      <HStack gap="0" m="4" justifyContent="space-between" alignItems="center">
        {status == true ? (
          <Badge colorPalette="green" variant="solid">
            Active
          </Badge>
        ) : (
          <Badge colorPalette="orange">Deactivated</Badge>
        )}
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
