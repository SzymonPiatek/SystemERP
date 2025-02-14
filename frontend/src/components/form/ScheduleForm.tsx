import { FC, useState, useContext, useEffect } from 'react';
import { Box, Button, Card, IconButton, Input, SimpleGrid, Text, Textarea } from '@chakra-ui/react';
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '../../components/ui/dialog';
import { toaster } from '../../components/ui/toaster.tsx';
import DatePicker from 'react-datepicker';
import { MdClose } from 'react-icons/md';
import { AuthContext } from '../../contexts/AuthContext';
import { useAddEvent } from '../../hooks/events/useEvents';
import { SelectUserList } from '../list/SelectUserList.tsx';

export const ScheduleForm: FC<{}> = () => {
  const [open, setOpen] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const { user } = useContext(AuthContext);
  const { mutate: addEvent } = useAddEvent();

  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const handleOpenChange = (e: { open: boolean }) => {
    setOpen(e.open);
  };

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date ?? new Date());
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date ?? new Date());
  };

  const handleCreateEvent = () => {
    if (!user?.id) {
      toaster.create({
        title: 'Error',
        description: 'User is not authenticated.',
        type: 'error',
      });
      return;
    }

    const payload = {
      title: updatedTitle,
      description: description,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      ownerId: user.id,
      invited: selectedUsers,
    };

    addEvent({ data: payload });
    setOpen(false);
  };

  useEffect(() => {
    if (!open) {
      setUpdatedTitle('');
      setDescription('');
      setStartDate(new Date());
      setEndDate(new Date());
      setSelectedUsers([]);
    }
  }, [open]);

  const isButtonDisabled = !updatedTitle || !startDate || !endDate;

  return (
    <DialogRoot lazyMount open={open} onOpenChange={handleOpenChange} size="xl">
      <DialogTrigger>AddEvent</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Event</DialogTitle>
        </DialogHeader>

        <DialogBody>
          <Card.Root>
            <Card.Body gap="2">
              <SimpleGrid columns={2} gap="4">
                <Box>
                  <Text>
                    <Input
                      value={updatedTitle}
                      onChange={(e) => setUpdatedTitle(e.target.value)}
                      placeholder="Enter title"
                    />
                  </Text>
                  <Text fontWeight="bold">Description:</Text>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Event Description"
                  />
                  <Text fontSize="sm" fontWeight="bold" mb={2} mt={4}>
                    Start Date
                  </Text>
                  <DatePicker
                    selected={startDate}
                    onChange={handleStartDateChange}
                    showTimeSelect
                    dateFormat="Pp"
                    placeholderText="Select a start date and time"
                    customInput={<Input />}
                  />

                  <Text fontSize="sm" fontWeight="bold" mb={2} mt={4}>
                    End Date
                  </Text>
                  <DatePicker
                    selected={endDate}
                    onChange={handleEndDateChange}
                    showTimeSelect
                    dateFormat="Pp"
                    placeholderText="Select an end date and time"
                    customInput={<Input />}
                  />
                </Box>
                <SelectUserList
                  selectedUsers={selectedUsers}
                  onUserSelectionChange={setSelectedUsers}
                />
              </SimpleGrid>
            </Card.Body>
          </Card.Root>
        </DialogBody>

        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogActionTrigger>

          <Button onClick={handleCreateEvent} disabled={isButtonDisabled}>
            Create
          </Button>
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

export default ScheduleForm;
