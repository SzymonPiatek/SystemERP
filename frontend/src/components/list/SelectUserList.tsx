import { Box, Heading, SimpleGrid } from '@chakra-ui/react';
import { useUsers } from '../../hooks/users/useUsers.tsx';
import { CheckboxCard } from '../ui/checkbox-card.tsx';

interface SelectUserListProps {
  onUserSelectionChange: (selectedUsers: number[]) => void;
  selectedUsers: number[];
}

export const SelectUserList: React.FC<SelectUserListProps> = ({
  onUserSelectionChange,
  selectedUsers,
}) => {
  const { data: userData } = useUsers({ limit: 1000 });
  const users = userData?.data ?? [];

  const toggleInvitedUser = (userId: number) => {
    const updatedUsers = selectedUsers.includes(userId)
      ? selectedUsers.filter((id) => id !== userId)
      : [...selectedUsers, userId];

    onUserSelectionChange(updatedUsers);
  };

  const invitedUserObjects = users.filter((user) => selectedUsers.includes(user.id));

  return (
    <Box>
      <Heading>Invited people</Heading>
      <p>
        {invitedUserObjects.length === 0 ? (
          <span>No users invited</span>
        ) : (
          invitedUserObjects.map((user) => <span key={user.id}>{user.firstName} </span>)
        )}
      </p>
      <Heading>Invite to event: </Heading>
      <SimpleGrid columns={2} maxH="14rem" overflow="auto">
        {users.map((user) => (
          <CheckboxCard
            key={user.id}
            label={user.firstName}
            description={user.lastName}
            value={user.id}
            onChange={() => toggleInvitedUser(user.id)}
            defaultChecked={selectedUsers.includes(user.id)}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};
