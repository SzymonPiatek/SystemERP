import { Button, Card, Input, Text } from '@chakra-ui/react';
import { FC, useState } from 'react';
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

export const ScheduleForm: FC<{}> = () => {
  const [open, setOpen] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  const handleOpenChange = (e: { open: boolean }) => {
    setOpen(e.open);
  };

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date ?? new Date());
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date ?? new Date());
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
          <Card.Root width="320px">
            <Card.Body gap="2">
              {/* Title input */}
              <Text fontSize="sm" fontWeight="bold" mb={2}>
                Title
              </Text>
              <Input
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
                placeholder="Enter title"
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
            </Card.Body>
          </Card.Root>
        </DialogBody>

        <DialogFooter>
          <DialogActionTrigger>
            <Button variant="outline">Cancel</Button>
          </DialogActionTrigger>

          <Button>Save</Button>
        </DialogFooter>

        <DialogCloseTrigger>
          <Button variant="ghost">Close</Button>
        </DialogCloseTrigger>
      </DialogContent>
    </DialogRoot>
  );
};
