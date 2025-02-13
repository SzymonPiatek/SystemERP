import { useState, FC, useEffect } from 'react';
import { Calendar, momentLocalizer, View, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {
  Box,
  Button,
  Text,
  Stack,
  Input,
  Textarea,
  IconButton,
  SimpleGrid,
} from '@chakra-ui/react';
import {
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogTitle,
  DialogCloseTrigger,
} from '../ui/dialog';
import DatePicker from 'react-datepicker';
import { MdClose } from 'react-icons/md';
import { useDeleteEvent, useEditEvent, useEvents } from '../../hooks/events/useEvents';
import { SelectUserList } from '../list/SelectUserList';
import { User } from '../../utils/types';

const localizer = momentLocalizer(moment);

interface BigCalendarProps {
  set: string;
  classes?: string;
}

const BigCalendar: FC<BigCalendarProps> = ({ set, classes }) => {
  const initialView = Views[set as keyof typeof Views] || Views.WORK_WEEK;
  const [view, setView] = useState<View>(initialView);
  const [dialogState, setDialogState] = useState({ open: false });
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [id, setId] = useState<number | null>(null);
  const [invitedUsers, setInvitedUsers] = useState<number[]>([]);
  const [usersData, setUsersData] = useState<User[]>([]);

  const { data: events, isLoading, isError, error } = useEvents();
  const { mutate: deleteEvent } = useDeleteEvent();
  const { mutate: editEvent } = useEditEvent();

  const invites = events ? events.flatMap((event) => event.invitations) : [];

  useEffect(() => {
    if (!dialogState.open) {
      setSelectedEvent(null);
      setTitle('');
      setDescription('');
      setStartDate(new Date());
      setEndDate(new Date());
      setId(null);
      setInvitedUsers([]);
    }
  }, [dialogState.open]);

  useEffect(() => {
    if (isError) {
      console.error('Error fetching events:', error);
    }
  }, [isError, error]);

  if (isLoading) {
    return <p>Loading events...</p>;
  }

  if (isError) {
    return <p>Error loading events</p>;
  }

  const formattedEvents =
    Array.from(
      new Map(
        events?.map((event: any) => [
          event.id,
          {
            id: event.id,
            title: event.title,
            description: event.description,
            allDay: event.isAllDay,
            start: new Date(event.startDate),
            end: new Date(event.endDate),
          },
        ]),
      ).values(),
    ) || [];

  const handleOnChangeView = (selectedView: View) => {
    setView(selectedView);
  };

  const handleEventClick = (event: any) => {
    setSelectedEvent(event);
    setTitle(event.title);
    setDescription(event.description);
    setStartDate(event.start);
    setEndDate(event.end);
    setId(event.id);

    const eventInvites = Array.from(
      new Map(
        invites
          .filter((invite) => invite.eventId === event.id)
          .map((invite) => [invite.userId, invite]),
      ).values(),
    );
    const userIds = eventInvites.map((invite) => invite.userId);
    const users = eventInvites.map((user) => {
      return user.user;
    });
    setUsersData(users);
    setInvitedUsers(userIds);
    setDialogState({ open: true });
  };
  const handleSave = () => {
    if (!id) {
      return;
    }

    const invitations = [...invitedUsers];

    const payload = {
      title,
      description,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      invited: invitations,
    };

    editEvent({ updatedEvent: payload, id });
    setDialogState({ open: false });
  };

  const handleDelete = () => {
    if (!id) {
      return;
    }

    deleteEvent({ eventId: id });
    setDialogState({ open: false });
  };

  return (
    <Box>
      <Calendar
        localizer={localizer}
        events={formattedEvents}
        startAccessor="start"
        endAccessor="end"
        views={['work_week', 'week', 'day']}
        view={view}
        style={{ height: '100%' }}
        onView={handleOnChangeView}
        min={new Date(2025, 1, 0, 7, 0, 0)}
        max={new Date(2025, 1, 0, 20, 0, 0)}
        onSelectEvent={handleEventClick}
        className={classes}
        dayLayoutAlgorithm="no-overlap"
      />

      {selectedEvent && (
        <DialogRoot {...dialogState} onOpenChange={setDialogState} size="xl">
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Event</DialogTitle>
            </DialogHeader>
            <DialogBody>
              <SimpleGrid columns={2} gap={4}>
                <Stack>
                  <Text fontWeight="bold">Title:</Text>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Event Title"
                  />
                  <Text fontWeight="bold">Description:</Text>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Event Description"
                  />
                  <Text fontWeight="bold">Start Date:</Text>
                  <DatePicker
                    selected={startDate}
                    onChange={(date: Date | null) => setStartDate(date ?? new Date())}
                    showTimeSelect
                    dateFormat="Pp"
                    customInput={<Input />}
                  />
                  <Text fontWeight="bold">End Date:</Text>
                  <DatePicker
                    selected={endDate}
                    onChange={(date: Date | null) => setEndDate(date ?? new Date())}
                    showTimeSelect
                    dateFormat="Pp"
                    customInput={<Input />}
                  />
                </Stack>

                <Box>
                  <Text fontWeight="bold">Invite Users:</Text>
                  <SelectUserList
                    onUserSelectionChange={setInvitedUsers}
                    selectedUsers={invitedUsers}
                    usersData={usersData}
                  />
                </Box>
              </SimpleGrid>
            </DialogBody>
            <DialogFooter>
              <Button variant="outline" onClick={handleSave}>
                Save
              </Button>
              <Button variant="outline" onClick={handleDelete}>
                Delete
              </Button>
            </DialogFooter>

            <DialogCloseTrigger>
              <IconButton variant="outline" onClick={() => setDialogState({ open: false })}>
                <MdClose />
              </IconButton>
            </DialogCloseTrigger>
          </DialogContent>
        </DialogRoot>
      )}
    </Box>
  );
};

export default BigCalendar;
