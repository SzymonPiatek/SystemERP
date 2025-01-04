import { Card, Flex, IconButton, Table, HStack } from '@chakra-ui/react';
import { Status } from '../components/ui/status';
import { FC, useEffect, useState } from 'react';
import { getUsers } from '../actions/employeesActions';
import { AxiosError } from 'axios';
import { Employee } from '../utils/types';
import { MdEdit } from 'react-icons/md';
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from '..//components/ui/pagination';
export const Employees: FC<{}> = () => {
  const [queryParams, setQueryParams] = useState({
    page: 1,
    limit: 10,
  });
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [previousPage, setPreviousPage] = useState<number | null>(null);
  const [nextPage, setNextPage] = useState<number | null>(null);
  const fetchData = async () => {
    try {
      const response = await getUsers(queryParams);
      if (!(response instanceof AxiosError)) {
        setEmployees(response.data);
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
          <PaginationRoot count={1} pageSize={2} defaultPage={1} variant="outline">
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
