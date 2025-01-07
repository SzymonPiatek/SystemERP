import { Box, Flex, Card } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { SingleNote } from '../components/notes/SingleNote';
import { useSearchParams } from 'react-router-dom';
import { QueryParamsProps } from '../utils/types';
import { NewNoteForm } from '../components/form/NewNoteForm.tsx';
import { useNotes } from '../hooks/notes/useNote.tsx';
import { deleteNote } from '../actions/noteActions.ts';
import { Pagination } from '../components/pagination/Pagination.tsx';

export const Notes: FC<{}> = () => {
  const [pageLimit, setPageLimit] = useState(5);
  const [searchParams, setSearchParams] = useSearchParams();
  const [queryParams, setQueryParams] = useState<QueryParamsProps>({
    search: searchParams.get('search') || '',
    page: parseInt(searchParams.get('page') || '1', 10),
    limit: parseInt(searchParams.get('limit') || `${pageLimit}`, 10),
  });

  const { data, isLoading, isError } = useNotes(queryParams);
  const notes = data?.data ?? [];
  const currentPage = data?.page ?? 1;
  const totalItems = data?.total;

  useEffect(() => {
    setQueryParams((prev) => ({
      ...prev,
      limit: pageLimit,
    }));
  }, [pageLimit]);

  useEffect(() => {
    const params: Record<string, string> = {};

    for (const key in queryParams) {
      if (queryParams[key]) {
        params[key] = queryParams[key].toString();
      }
    }

    if (JSON.stringify(params) !== JSON.stringify(Object.fromEntries(searchParams))) {
      setSearchParams(params, { replace: true });
    }
  }, [queryParams, searchParams, setSearchParams]);

  const handlePageChange = (newPage: number) => {
    setQueryParams((prev) => ({ ...prev, page: newPage }));
  };

  const handleDelete = (id: number) => {
    deleteNote(id);
  };

  return (
    <Flex direction="column" maxH="calc(100vh - 7rem)">
      <Box flex="1" overflowY="auto" padding="4">
        <Flex wrap="wrap" gap="4">
          {notes.length > 0 ? (
            notes.map((note) => (
              <SingleNote
                key={note.id}
                title={note.title}
                desc={note.description}
                id={note.id}
                deleteNote={handleDelete}
              />
            ))
          ) : (
            <Box textAlign="center" width="100%" mt="8">
              No notes to display.
            </Box>
          )}
        </Flex>
      </Box>
      <Box pt="2">
        <Card.Root>
          <Card.Body>
            <Pagination
              currentPage={currentPage}
              pageSize={Number(queryParams.limit) || 2}
              handlePageChange={handlePageChange}
              totalItems={totalItems || 1}
              setPageLimitToParent={setPageLimit}
              children={<NewNoteForm />}
            />
          </Card.Body>
        </Card.Root>
      </Box>
    </Flex>
  );
};
