import { Box, HStack } from '@chakra-ui/react';
import { FC, useState } from 'react';
import { BoxWithTitle } from '../ui/BoxWithTitle';
import { Button } from '../ui/button';

import { MdEdit, MdDelete } from 'react-icons/md';
import { deleteNote } from '../../actions/noteActions';

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
          {/* Inner box with full opacity */}
          <Box bg="white" rounded="2xl" shadow="lg" maxW="40vw" p="6" zIndex="1010" opacity="1">
            <Box>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est, esse, eligendi corrupti
              cupiditate accusantium nostrum ut exercitationem vero iure illo fugit molestiae.
              Aliquam repellendus obcaecati eveniet fuga alias laboriosam excepturi?
            </Box>

            <Button onClick={() => setIsOpen(false)} mt="4">
              Close
            </Button>
          </Box>
        </Box>
      ) : (
        <></>
      )}

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
