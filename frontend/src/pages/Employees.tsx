import { Card, Flex, IconButton, Table, HStack } from '@chakra-ui/react';
import { Status } from '../components/ui/status';
import { FC, useEffect, useState } from 'react';
import { QueryParamsProps } from '../utils/types';
import { MdEdit } from 'react-icons/md';
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from '..//components/ui/pagination';
import { useSearchParams } from 'react-router-dom';
import { useUsers } from '../hooks/users/useUsers.tsx';

export const Employees: FC<{}> = () => {
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [queryParams, setQueryParams] = useState<QueryParamsProps>({
    search: searchParams.get('search') || '',
    page: parseInt(searchParams.get('page') || '1', 10),
    limit: parseInt(searchParams.get('limit') || '1', 10),
  });

  const { data, isLoading, isError } = useUsers(queryParams);

  const employees = data?.data ?? [];
  const total = data?.total ?? null;
  const currentPage = data?.page ?? null;
  const totalPages = data?.totalPages ?? null;
  const previousPage = data?.previous ?? null;
  const nextPage = data?.next ?? null;

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

  // const handlePrevious = () => {
  //   if (previousPage) {
  //     setQueryParams((prev) => ({ ...prev, page: Number(previousPage) }));
  //   }
  // };
  //
  // const handleNext = () => {
  //   if (nextPage) {
  //     setQueryParams((prev) => ({ ...prev, page: Number(nextPage) }));
  //   }
  // };

  return (
    <Flex>
      <Card.Root p="4" rounded="2xl" w="full">
        <Card.Body>
          <Table.Root size="sm" striped>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>Id</Table.ColumnHeader>
                <Table.ColumnHeader>First Name</Table.ColumnHeader>
                <Table.ColumnHeader>Last Name</Table.ColumnHeader>
                <Table.ColumnHeader>Email</Table.ColumnHeader>
                <Table.ColumnHeader>Status</Table.ColumnHeader>
                <Table.ColumnHeader></Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {employees.map((item) => (
                <Table.Row key={item.id}>
                  <Table.Cell>{item.id}</Table.Cell>
                  <Table.Cell>{item.firstName}</Table.Cell>
                  <Table.Cell>{item.lastName}</Table.Cell>
                  <Table.Cell>{item.email}</Table.Cell>
                  <Table.Cell>
                    {item.isActive ? (
                      <>
                        active <Status value="success" />
                      </>
                    ) : (
                      <>
                        inactive <Status value="error" />
                      </>
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    <IconButton variant="outline">
                      <MdEdit />
                    </IconButton>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
          <PaginationRoot
            page={currentPage}
            count={totalPages}
            pageSize={queryParams.limit}
            defaultPage={queryParams.page}
            // variant="outline"
            onPageChange={(e) => setPage(e.page)}
          >
            <HStack justify="center" mt="2">
              <PaginationPrevTrigger />
              <PaginationItems />
              <PaginationNextTrigger />
            </HStack>
          </PaginationRoot>
        </Card.Body>
      </Card.Root>
    </Flex>
  );
};
