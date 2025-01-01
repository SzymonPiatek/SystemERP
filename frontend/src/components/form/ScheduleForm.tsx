import { Button, Card, IconButton, Input, Text } from '@chakra-ui/react';
import { FC, useState, useContext } from 'react';
import {
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogCloseTrigger,
  DialogTitle,
  DialogActionTrigger,
} from '../../components/ui/dialog';

import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { AuthContext } from '../../contexts/AuthContext';

import { MdClose } from 'react-icons/md';
import { useAddEvent } from '../../hooks/useAddEvent';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Field } from '../ui/field';

export const ScheduleForm: FC<{}> = () => {
  const [open, setOpen] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const { user } = useContext(AuthContext);
  const { mutate: addEvent } = useAddEvent();
  const queryClient = useQueryClient();

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
      toast.error('User is not authenticated.');
      return;
    }

    const payload = {
      title: updatedTitle,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      ownerId: user.id,
    };

    addEvent(
      { data: payload },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['events']);
          setOpen(false);
          setUpdatedTitle('');
        },
      },
    );
  };

  return (
    <DialogRoot lazyMount open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger>
        <Button>Add Event</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Event</DialogTitle>
        </DialogHeader>

        <DialogBody>
          <Card.Root>
            <Card.Body gap="2">
              <Field invalid label="Title" errorText="This field is required">
                <Input
                  value={updatedTitle}
                  onChange={(e) => setUpdatedTitle(e.target.value)}
                  placeholder="Enter title"
                />
              </Field>
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
            </Card.Body>
          </Card.Root>
        </DialogBody>

        <DialogFooter>
          <DialogActionTrigger>
            <Button variant="outline">Cancel</Button>
          </DialogActionTrigger>

          <Button onClick={handleCreateEvent}>Create</Button>
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
