import { Flex } from '@chakra-ui/react';
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

        if (!(response instanceof AxiosError)) {
          setNotes(response.notes);
        }
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes();
  }, []);

  return (
    <Flex wrap="wrap" justify="flex-start" gap="4">
      {notes.map((note) => (
        <SingleNote key={note.id} title={note.title} desc={note.description} id={note.id} />
      ))}
    </Flex>
  );
};
