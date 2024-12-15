import { getISODateTimeWithOffset, isWeekday } from '../../utils/date';
import { getRandomInt } from '../../utils/number';

export const eventsData = (() => {
  const events = [];
  let currentDate = new Date();
  let dayOffset = 0;
  let eventCount = 0;

  while (eventCount < 50) {
    if (isWeekday(currentDate)) {
      const remainingEvents = 50 - eventCount;
      const eventsInDay = Math.min(getRandomInt(1, 4), remainingEvents);

      for (let j = 0; j < eventsInDay; j++) {
        const startHour = getRandomInt(7, 16);
        const duration = getRandomInt(1, Math.min(8, 17 - startHour));

        events.push({
          id: eventCount + 1,
          title: `Exciting Event ${eventCount + 1}`,
          isAllDay: false,
          startDate: getISODateTimeWithOffset(dayOffset, startHour, 0),
          endDate: getISODateTimeWithOffset(dayOffset, startHour + duration, 0),
          ownerId: 1,
        });

        eventCount++;
      }
    }

    currentDate.setDate(currentDate.getDate() + 1);
    dayOffset++;
  }

  return events;
})();
