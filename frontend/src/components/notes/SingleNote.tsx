import { Box } from '@chakra-ui/react';
import { FC } from 'react';
import { BoxWithTitle } from '../ui/BoxWithTitle';

export type SingleNoteProps = { title: string; status: string; desc: string };

export const SingleNote: FC<SingleNoteProps> = (props) => {
  const { title, status, desc } = props;

  return (
    <Box bg="white" rounded="2xl" p="4" m="4">
      <BoxWithTitle Title={title} Text={desc} />
      {status == 'active' ? <Box>Active</Box> : <Box>Nope</Box>}
    </Box>
  );
};
