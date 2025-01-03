import { useState, FC } from 'react';
import { Calendar, momentLocalizer, View, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Box, Button, Text, Stack, Input, Textarea, IconButton } from '@chakra-ui/react';
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
import { deleteEvent, editNote } from '../../actions/eventActions';

const localizer = momentLocalizer(moment);

interface BigCalendarProps {
  events: any[];
  set: string;
  classes?: string;
}

const BigCalendar: FC<BigCalendarProps> = ({ events, set, classes }) => {
  const initialView = Views[set as keyof typeof Views] || Views.WORK_WEEK;
  const [view, setView] = useState<View>(initialView);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [id, setId] = useState<number | null>(null);

  const handleOnChangeView = (selectedView: View) => {
    setView(selectedView);
  };

  const handleEventClick = (event: any) => {
    setSelectedEvent(event);
    setTitle(event.title);
    setDescription(event.description);
    setStartDate(event.start);
    setEndDate(event.end);
    setDialogOpen(true);
    setId(event.id);
  };

  const handleSave = async () => {
    if (!id) {
      return;
    }

    const payload = {
      title,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    };

    try {
      await editNote(id, payload);
      setDialogOpen(false);
      setSelectedEvent(null);
    } catch (error) {}
  };

  const handleDelete = async () => {
    if (!id) {
      return;
    }

    try {
      await deleteEvent(id);
      setDialogOpen(false);
      setSelectedEvent(null);
    } catch (error) {}
  };

  return (
    <Box>
      <Calendar
        localizer={localizer}
        events={events}
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
        <DialogRoot open={dialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Event</DialogTitle>
            </DialogHeader>
            <DialogBody>
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
              <IconButton variant="outline" onClick={() => setDialogOpen(false)}>
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
