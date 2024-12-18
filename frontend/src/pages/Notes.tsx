import { Box, Flex } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { SingleNote } from '../components/notes/SingleNote';
import { AxiosError } from 'axios';
import { Note } from '../utils/types';
import { deleteNote, getNotes } from '../actions/noteActions';
import { useSearchParams } from 'react-router-dom';
import CustomButton from '../components/button/CustomButton.tsx';

export const Notes: FC<{}> = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [previousPage, setPreviousPage] = useState<number | null>(null);
  const [nextPage, setNextPage] = useState<number | null>(null);

  const [queryParams, setQueryParams] = useState({
    page: 1,
    limit: 10,
  });
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    setQueryParams({
      page,
      limit,
    });
  }, [searchParams]);

  useEffect(() => {
    const params: Record<string, string> = {};

    params.page = queryParams.page.toString();
    params.limit = queryParams.limit.toString();

    setSearchParams(params);
  }, [queryParams, setSearchParams]);

  const fetchData = async () => {
    try {
      const response = await getNotes(queryParams);
      if (!(response instanceof AxiosError)) {
        setNotes(response.data);
        setPreviousPage(response.previous);
        setNextPage(response.next);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [queryParams]);

  const handleDeleteNote = async (noteId: number) => {
    try {
      await deleteNote(noteId);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handlePrevious = () => {
    if (previousPage) {
      setQueryParams((prev) => ({ ...prev, page: previousPage }));
    }
  };

  const handleNext = () => {
    if (nextPage) {
      setQueryParams((prev) => ({ ...prev, page: nextPage }));
    }
  };

  return (
    <>
      <Flex wrap="wrap" justify="flex-start" gap="4">
        {notes.map((note) => (
          <SingleNote
            key={note.id}
            title={note.title}
            desc={note.description}
            id={note.id}
            deleteNote={handleDeleteNote}
          />
        ))}
      </Flex>
      <Box display="flex" gap="2rem" justifyContent="end">
        <CustomButton type="button" children="prev" onClick={handlePrevious} />
        <CustomButton type="button" children="next" onClick={handleNext} />
      </Box>
    </>
  );
};
