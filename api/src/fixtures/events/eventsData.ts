import { getISODateTimeWithOffset } from '../../utils/date';
import { getRandomInt } from '../../utils/number';

export const eventsData = Array.from({ length: 50 }, (_, index) => {
  const dayOffset = index;
  const startHour = getRandomInt(7, 16);
  const duration = getRandomInt(1, Math.min(8, 17 - startHour));

  return {
    id: index + 1,
    title: `Exciting Event ${index + 1}`,
    isAllDay: false,
    startDate: getISODateTimeWithOffset(dayOffset, startHour, 0),
    endDate: getISODateTimeWithOffset(dayOffset, startHour + duration, 0),
    ownerId: 1,
  };
});
