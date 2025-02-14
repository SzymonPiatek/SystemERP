import { Box, Heading, SimpleGrid, Input, Badge, Flex } from '@chakra-ui/react';
import { useUsers } from '../../hooks/users/useUsers.tsx';
import { CheckboxCard } from '../ui/checkbox-card.tsx';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { QueryParamsProps, User } from '../../utils/types.ts';
import { Pagination } from '../pagination/Pagination.tsx';

interface SelectUserListProps {
  onUserSelectionChange: (selectedUsers: number[]) => void;
  selectedUsers: number[];
  usersData?: User[];
}

export const SelectUserList: React.FC<SelectUserListProps> = ({
  onUserSelectionChange,
  selectedUsers,
  usersData,
}) => {
  const [pageLimit, setPageLimit] = useState(6);
  const [searchParams, setSearchParams] = useSearchParams();
  const [queryParams, setQueryParams] = useState<QueryParamsProps>({
    search: searchParams.get('search') || '',
    page: parseInt(searchParams.get('page') || '1', 10),
    limit: parseInt(searchParams.get('limit') || `${pageLimit}`, 10),
  });
  const { data: userData, isLoading, isError } = useUsers(queryParams);
  const users = userData?.data ?? [];
  const currentPage = userData?.page ?? 1;
  const totalItems = userData?.total;
  const allInvites = usersData;

  const [invitedUsers, setInvitedUsers] = useState<number[]>(selectedUsers);

  const handlePageChange = (newPage: number) => {
    setQueryParams((prev) => ({ ...prev, page: newPage }));
  };

  const toggleInvitedUser = (userId: number) => {
    const updatedUsers = invitedUsers.includes(userId)
      ? invitedUsers.filter((id) => id !== userId)
      : [...invitedUsers, userId];

    setInvitedUsers(updatedUsers);
    onUserSelectionChange(updatedUsers);
  };

  useEffect(() => {
    setQueryParams({
      search: searchParams.get('search') || '',
      page: parseInt(searchParams.get('page') || '1', 10),
      limit: parseInt(searchParams.get('limit') || `${pageLimit}`, 10),
    });
  }, [searchParams, pageLimit]);

  useEffect(() => {
    setInvitedUsers(selectedUsers);
  }, [selectedUsers]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchValue = event.target.value;

    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set('search', newSearchValue);
      newParams.set('page', '1');
      return newParams;
    });
  };

  return (
    <Box>
      <Heading>Invited people</Heading>

      {!allInvites ? (
        <span>No users invited</span>
      ) : (
        <Flex wrap="wrap" gap={2} alignItems="center">
          {allInvites.map((user) => (
            <Badge
              key={user.id}
              variant="solid"
              colorPalette="green"
              px={1}
              py={1}
              borderRadius="md"
            >
              {user.firstName} {user.lastName}
            </Badge>
          ))}
        </Flex>
      )}

      <Heading>Invite to event: </Heading>

      <Input
        placeholder="Search users"
        value={queryParams.search || ''}
        onChange={handleSearchChange}
        mb={4}
      />

      <SimpleGrid columns={2} maxH="14rem" overflow="auto">
        {users.map((user) => (
          <CheckboxCard
            key={user.id}
            label={user.firstName}
            description={user.lastName}
            value={user.id}
            onChange={() => toggleInvitedUser(user.id)}
            defaultChecked={invitedUsers.includes(user.id)}
          />
        ))}
      </SimpleGrid>

      {!isLoading && !isError && (
        <Pagination
          currentPage={currentPage}
          pageSize={Number(queryParams.limit) || 2}
          handlePageChange={handlePageChange}
          totalItems={totalItems || 1}
          setPageLimitToParent={setPageLimit}
          isVisible={false}
        />
      )}
    </Box>
  );
};
