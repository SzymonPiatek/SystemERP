import { Calendar, momentLocalizer, View, Views } from 'react-big-calendar';
import moment from 'moment';
import { calendarEvents } from '../../lib/data.ts';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useState } from 'react';
import { Box } from '@chakra-ui/react';

const localizer = momentLocalizer(moment);

const BigCalendar = () => {
  const [view, setView] = useState<View>(Views.WORK_WEEK);

  const handleOnChangeView = (selectedView: View) => {
    setView(selectedView);
  };

  return (
    <Box>
      <Calendar
        localizer={localizer}
        events={calendarEvents}
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
