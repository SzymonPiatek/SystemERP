import { Box, HStack, Card } from '@chakra-ui/react';
import { FC } from 'react';
import { BoxWithTitle } from '../ui/BoxWithTitle';
import { Button } from '../ui/button';

import { MdDelete } from 'react-icons/md';

import { NoteForm } from '../form/NoteForm';

export type SingleNoteProps = {
  title: string;
  desc: string;
  id: number;
  deleteNote: (noteId: number) => void;
};

export const SingleNote: FC<SingleNoteProps> = ({ title, desc, id, deleteNote }) => {
  return (
    <Card.Root rounded="2xl" p="4" maxW="25vw" minW="15vw">
      <Card.Body>
        <BoxWithTitle Title={title} Text={desc} />
        <HStack gap="0" m="4" justifyContent="end" alignItems="center">
          <Box>
            <NoteForm title={title} description={desc} id={id} />
            <Button
              _hover={{
                color: 'green.700',
              }}
              onClick={() => deleteNote(id)}
              variant="outline"
            >
              <MdDelete />
            </Button>
          </Box>
        </HStack>
      </Card.Body>
    </Card.Root>
  );
};
