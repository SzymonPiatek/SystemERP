import { Button, Card, IconButton, Input } from '@chakra-ui/react';

import { FC, useContext, useState } from 'react';
import {
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogCloseTrigger,
  DialogTitle,
} from '../../components/ui/dialog';
import { MdClose, MdAddCircleOutline } from 'react-icons/md';
import { Field } from '../ui/field';
import { useRegisterUser } from '../../hooks/users/useUsers';
import { roles } from '../../utils/roles';
import { AuthContext } from '../../contexts/AuthContext';
import { useCompanies } from '../../hooks/companies/useCompanies';

type RegisterUserFormProps = {};

export const RegisterUserForm: FC<RegisterUserFormProps> = () => {
  const { user } = useContext(AuthContext);

  const [open, setOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    roleId: roles[0]?.roleId || 5,
    companyId: user?.companyId || null,
  });
  const setRole = roles;

  const handleOpenChange = (e: { open: boolean }) => {
    setOpen(e.open);
  };

  const { mutate: registerUser } = useRegisterUser();
  const { data, isLoading, isError } = useCompanies();
  console.log(data);

  const handleInputChange =
    (field: keyof typeof newUser) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewUser((prevUser) => ({
        ...prevUser,
        [field]: e.target.value,
      }));
    };

  const handleSave = async () => {
    const { firstName, lastName, email, roleId, companyId } = newUser;

    if (!firstName || !lastName || !email) {
      console.error('Please fill in all fields');
      return;
    }

    try {
      if (companyId) {
        await registerUser({ newUser: { firstName, lastName, email, roleId, companyId } });
      } else {
        await registerUser({ newUser: { firstName, lastName, email, roleId } });
      }
      setNewUser({
        firstName: '',
        lastName: '',
        email: '',
        roleId: roles[0]?.roleId,
        companyId: null,
      });
      setOpen(false);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <DialogRoot lazyMount open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger>
        <IconButton variant="outline" p="2">
          <MdAddCircleOutline /> Add User
        </IconButton>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New User</DialogTitle>
        </DialogHeader>

        <DialogBody>
          <Card.Root>
            <Card.Body gap="2">
              <Field label="First Name" required>
                <Input
                  value={newUser.firstName}
                  onChange={handleInputChange('firstName')}
                  placeholder="Enter first name"
                />
              </Field>

              <Field label="Last Name" required>
                <Input
                  value={newUser.lastName}
                  onChange={handleInputChange('lastName')}
                  placeholder="Enter last name"
                />
              </Field>
              <Field label="Role" required py="2">
                <select
                  onChange={(e) => setNewUser({ ...newUser, roleId: parseInt(e.target.value) })}
                >
                  {setRole.map((role) => (
                    <option key={role.roleId} value={role.roleId}>
                      {role.roleName}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Email" required>
                <Input
                  value={newUser.email}
                  onChange={handleInputChange('email')}
                  placeholder="Enter email"
                />
              </Field>
              {user?.profile?.roleId == 1 && (
                <Field label="Company" required py="2">
                  <select
                    onChange={(e) =>
                      setNewUser({ ...newUser, companyId: parseInt(e.target.value) })
                    }
                  >
                    {data?.map((company) => (
                      <option key={company.id} value={company.id}>
                        {company.name}
                      </option>
                    ))}
                  </select>
                </Field>
              )}
            </Card.Body>
          </Card.Root>
        </DialogBody>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>

        <DialogCloseTrigger>
          <IconButton variant="outline">
            <MdClose />
          </IconButton>
        </DialogCloseTrigger>
      </DialogContent>
    </DialogRoot>
  );
};
