import React, { useEffect, useState } from 'react';
import { Flex, CheckboxGroup, Heading, SimpleGrid } from '@chakra-ui/react';
import { QueryParamsProps } from '../../utils/types.ts';
import { useSearchParams } from 'react-router-dom';
import { useUsers } from '../../hooks/users/useUsers.tsx';
import { CheckboxCard } from '../ui/checkbox-card.tsx';

export const SelectUserList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [queryParams, setQueryParams] = useState<QueryParamsProps>({
    search: searchParams.get('search') || '',
    limit: 1000,
  });

  const { data, isLoading, isError } = useUsers(queryParams);
  const users = data?.data ?? [];

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

  return (
    <>
      <Heading>Invite to event: </Heading>
      <SimpleGrid columns={2} maxH="14rem" overflow="auto">
        {users.map((user) => (
          <InviteUserCard
            key={user.id}
            id={user.id}
            firstName={user.firstName}
            lastName={user.lastName}
          />
        ))}
      </SimpleGrid>
    </>
  );
};

function InviteUserCard({
  id,
  firstName,
  lastName,
}: {
  id: number;
  firstName: string;
  lastName: string;
}) {
  return <CheckboxCard key={id} label={firstName} description={lastName} />;
}

export default InviteUserCard;
