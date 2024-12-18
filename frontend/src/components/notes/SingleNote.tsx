import { Box, HStack, Icon, IconButton } from '@chakra-ui/react';
import { FC, useState } from 'react';
import { BoxWithTitle } from '../ui/BoxWithTitle';
import { Button } from '../ui/button';

import { MdEdit, MdDelete, MdClose } from 'react-icons/md';
import { deleteNote } from '../../actions/noteActions';
import { NoteForm } from '../form/NoteForm';

export type SingleNoteProps = { title: string; desc: string; id: number };

export const SingleNote: FC<SingleNoteProps> = (props) => {
  const { title, desc, id } = props;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen ? (
        <Box
          position="fixed"
          w="100vw"
          h="100vh"
          zIndex="1005"
          top="0"
          left="0"
          bg="rgba(0, 0, 0, 0.8)"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            position="relative"
            bg="white"
            rounded="2xl"
            shadow="lg"
            maxW="40vw"
            p="6"
            zIndex="1010"
            opacity="1"
          >
            <IconButton
              aria-label="Close modal"
              size="sm"
              position="absolute"
              top="2"
              right="2"
              onClick={() => setIsOpen(false)}
              color="red.500"
              variant="ghost"
              _hover={{ color: 'red.700', bg: 'gray.300' }}
            >
              <MdClose />
            </IconButton>

            <NoteForm title={title} description={desc} id={id} />
          </Box>
        </Box>
      ) : null}

      <Box bg="white" rounded="2xl" p="4" maxW="33%">
        <BoxWithTitle Title={title} Text={desc} />
        <HStack gap="0" m="4" justifyContent="end" alignItems="center">
          <Box>
            <Button
              onClick={() => setIsOpen(true)}
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
              onClick={() => deleteNote(id)}
            >
              <MdDelete />
            </Button>
          </Box>
        </HStack>
      </Box>
    </>
  );
};
