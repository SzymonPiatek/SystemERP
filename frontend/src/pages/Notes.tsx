import { Box, Flex, VStack } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { SingleNote } from '../components/notes/SingleNote';
import { AxiosError } from 'axios';
import { Note } from '../utils/types';
import { getNotes } from '../actions/noteActions';

export const Notes: FC<{}> = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await getNotes();
        console.log(response);

        if (!(response instanceof AxiosError)) {
          // @ts-ignore
          setNotes(response.notes);
        }
        console.log(response.data.notes);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes();
  }, []);

  return (
    <Flex wrap="wrap" justify="center">
      {notes.map((note) => (
        <SingleNote
          key={note.id}
          title={note.title}
          desc={note.description}
          status={note.isActive}
        />
      ))}
    </Flex>
  );
};
