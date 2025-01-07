import { Box, IconButton, Card } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';
import { MdClose } from 'react-icons/md';

interface ModalProps {
  modalState: boolean;
  onClose: () => void;
  children?: ReactNode;
}

export const Modal: FC<ModalProps> = ({ modalState, onClose, children }) => {
  if (!modalState) return null;

  return (
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
      <Card.Root
        position="relative"
        rounded="2xl"
        shadow="lg"
        maxW="40vw"
        p="6"
        zIndex="1010"
        opacity="1"
      >
        <Card.Body>
          <IconButton
            aria-label="Close modal"
            size="sm"
            position="absolute"
            top="2"
            right="2"
            onClick={onClose}
            color="red.500"
            variant="ghost"
            _hover={{ color: 'red.700', bg: 'gray.300' }}
          >
            <MdClose />
          </IconButton>
          {children}
        </Card.Body>
      </Card.Root>
    </Box>
  );
};
