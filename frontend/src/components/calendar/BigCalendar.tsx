import { useState, FC } from 'react';
import { Calendar, momentLocalizer, View, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Box } from '@chakra-ui/react';

const localizer = momentLocalizer(moment);

interface BigCalendarProps {
  events: any[];
}

const BigCalendar: FC<BigCalendarProps> = ({ events }) => {
  const [view, setView] = useState<View>(Views.WORK_WEEK);

  const handleOnChangeView = (selectedView: View) => {
    setView(selectedView);
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
        style={{ height: '98%' }}
        onView={handleOnChangeView}
        min={new Date(2025, 1, 0, 7, 0, 0)}
        max={new Date(2025, 1, 0, 20, 0, 0)}
      />
    </Box>
  );
};

export default BigCalendar;
