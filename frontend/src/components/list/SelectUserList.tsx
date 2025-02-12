import React, { useEffect, useState } from 'react';
import { Heading, SimpleGrid } from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';
import { useUsers } from '../../hooks/users/useUsers.tsx';
import { CheckboxCard } from '../ui/checkbox-card.tsx';
import { QueryParamsProps } from '../../utils/types.ts';

export const SelectUserList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [queryParams, setQueryParams] = useState<QueryParamsProps>({
    search: searchParams.get('search') || '',
    limit: 1000,
  });

  const { data } = useUsers(queryParams);
  const users = data?.data ?? [];

  const [invitedUsers, setInvitedUsers] = useState<number[]>([]);

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

  const toggleInvitedUser = (userId: number) => {
    setInvitedUsers((prevUsers) => {
      if (prevUsers.includes(userId)) {
        return prevUsers.filter((id) => id !== userId);
      } else {
        return [...prevUsers, userId];
      }
    });
    console.log(invitedUsers);
  };

  return (
    <>
      <Heading>Invited people</Heading>

      {invitedUsers.length === 0 ? (
        <p>No users invited</p>
      ) : (
        invitedUsers.map((user) => <p key={user}>{user}</p>)
      )}
      <Heading>Invite to event: </Heading>
      <SimpleGrid columns={2} maxH="14rem" overflow="auto">
        {users.map((user) => (
          <CheckboxCard
            key={user.id}
            label={user.firstName}
            description={user.lastName}
            value={user.id}
            onChange={() => toggleInvitedUser(user.id)}
            ischecked={invitedUsers.includes(user.id)}
          />
        ))}
      </SimpleGrid>
    </>
  );
};
