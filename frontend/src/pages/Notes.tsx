import { Box, Flex, IconButton } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { SingleNote } from '../components/notes/SingleNote';
import { AxiosError } from 'axios';
import { Note } from '../utils/types';
import { getNotes } from '../actions/noteActions';
import { useSearchParams } from 'react-router-dom';
import CustomButton from '../components/button/CustomButton.tsx';
import { useDeleteNote } from '../hooks/useDeleteNote.tsx';

import { IoMdAddCircle } from 'react-icons/io';
import { Modal } from '../components/Modal.tsx';
import { NewNoteForm } from '../components/form/NewNoteForm.tsx';

export const Notes: FC<{}> = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [previousPage, setPreviousPage] = useState<number | null>(null);
  const [nextPage, setNextPage] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [queryParams, setQueryParams] = useState({
    page: 1,
    limit: 10,
  });
  const [searchParams, setSearchParams] = useSearchParams();

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

  const { mutate: deleteNote } = useDeleteNote(fetchData);

  useEffect(() => {
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '20', 10);

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

  const handleDeleteNote = (id: number) => {
    deleteNote(id);
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

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
            fetchData={fetchData}
          />
        ))}
      </Flex>
      <Flex pt="4" justify="space-between">
        <Box>
          <IconButton aria-label="Add Note" onClick={() => setIsModalOpen(true)}>
            <IoMdAddCircle />
          </IconButton>
        </Box>
        <Box display="flex" gap="2rem" justifyContent="end">
          <CustomButton type="button" onClick={handlePrevious}>
            Prev
          </CustomButton>
          <CustomButton type="button" onClick={handleNext}>
            Next
          </CustomButton>
        </Box>
      </Flex>

      <Modal modalState={isModalOpen} onClose={handleCloseModal}>
        <NewNoteForm
          fetchData={fetchData}
          onClose={() => {
            setIsModalOpen(false);
          }}
        />
      </Modal>
    </>
  );
};
