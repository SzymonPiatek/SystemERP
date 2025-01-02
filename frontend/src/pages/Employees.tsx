import { Card, Flex, Table } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { getUsers } from '../actions/employeesActions';
import { AxiosError } from 'axios';
import { Employee } from '../utils/types';
export const Employees: FC<{}> = () => {
  const [queryParams, setQueryParams] = useState({
    page: 1,
    limit: 10,
  });
  const [employees, setEmployees] = useState<Employeer[]>([]);
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
      console.log(employees);
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
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {employees.map((item) => (
                <Table.Row key={item.id}>
                  <Table.Cell>{item.id}</Table.Cell>
                  <Table.Cell>{item.firstName}</Table.Cell>
                  <Table.Cell>{item.lastName}</Table.Cell>
                  <Table.Cell>{item.email}</Table.Cell>
                  <Table.Cell>{item.isActive ? 'active' : 'inactive'}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Card.Body>
      </Card.Root>
    </Flex>
  );
};
