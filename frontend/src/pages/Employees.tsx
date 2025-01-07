import { Box, Card, Flex, IconButton, Table, Spinner, Text } from '@chakra-ui/react';
import { Status } from '../components/ui/status';
import { FC, useEffect, useState } from 'react';
import { QueryParamsProps } from '../utils/types';
import { MdOutlineDelete } from 'react-icons/md';
import { useSearchParams } from 'react-router-dom';
import { useEditUser, useUsers } from '../hooks/users/useUsers.tsx';
import { Pagination } from '../components/pagination/Pagination.tsx';
import { deleteUser } from '../actions/usersActions.ts';
import { UsersForm } from '../components/form/UsersForm.tsx';
import { NewUserForm } from '../components/form/newUserForm.tsx';

export const Employees: FC<{}> = () => {
  const [pageLimit, setPageLimit] = useState(5);

  const [searchParams, setSearchParams] = useSearchParams();
  const [queryParams, setQueryParams] = useState<QueryParamsProps>({
    search: searchParams.get('search') || '',
    page: parseInt(searchParams.get('page') || '1', 10),
    limit: parseInt(searchParams.get('limit') || `${pageLimit}`, 10),
  });

  const { data, isLoading, isError } = useUsers(queryParams);
  const employees = data?.data ?? [];
  const currentPage = data?.page ?? 1;
  const totalItems = data?.total;

  const { mutate: editUser } = useEditUser();

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
    deleteUser(id);
  };

  console.log(data?.data);
  return (
    <Flex direction="column" align="center" justify="center">
      <Card.Root p="4" rounded="2xl" w="full">
        <Card.Body>
          {isLoading && (
            <Flex justify="center" align="center" h="200px">
              <Spinner size="lg" />
            </Flex>
          )}

          {isError && (
            <Flex justify="center" align="center" h="200px">
              <Text color="red.500">An error occurred while fetching data. Please try again.</Text>
            </Flex>
          )}

          {!isLoading && !isError && employees.length > 0 && (
            <Table.Root size="sm" striped>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader>Id</Table.ColumnHeader>
                  <Table.ColumnHeader>Role</Table.ColumnHeader>
                  <Table.ColumnHeader>First Name</Table.ColumnHeader>
                  <Table.ColumnHeader>Last Name</Table.ColumnHeader>
                  <Table.ColumnHeader>Email</Table.ColumnHeader>
                  <Table.ColumnHeader>Status</Table.ColumnHeader>
                  <Table.ColumnHeader>
                    <Box display="flex" justifyContent="end" mr="4">
                      Actions
                    </Box>
                  </Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {employees.map((item) => (
                  <Table.Row key={item.id}>
                    <Table.Cell>{item.id}</Table.Cell>
                    <Table.Cell>{item.roleName}</Table.Cell>
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
                      <Box display="flex" justifyContent="flex-end">
                        <UsersForm user={item} onEdit={editUser} />
                        <IconButton variant="outline" onClick={() => handleDelete(item.id)}>
                          <MdOutlineDelete />
                        </IconButton>
                      </Box>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          )}
          {!isLoading && !isError && (
            <Pagination
              currentPage={currentPage}
              pageSize={Number(queryParams.limit) || 2}
              handlePageChange={handlePageChange}
              totalItems={totalItems || 1}
              setPageLimitToParent={setPageLimit}
              children={<NewUserForm />}
            />
          )}
        </Card.Body>
      </Card.Root>
    </Flex>
  );
};
