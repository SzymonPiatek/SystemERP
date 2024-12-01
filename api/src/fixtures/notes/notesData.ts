import { getISODateTimeWithOffset, isWeekday } from '../../utils/date';
import { getRandomInt } from '../../utils/number';

export const notesData = (() => {
  const notes = [];
  let currentDate = new Date();
  let dayOffset = 0;
  let noteCount = 0;

  while (noteCount < 50) {
    if (isWeekday(currentDate)) {
      const hasDate = getRandomInt(0, 1) === 1;

      notes.push({
        id: noteCount + 1,
        title: `Note ${noteCount + 1}`,
        description: 'Lorem ipsum odor amet, consectetuer adipiscing elit.',
        isActive: true,
        ownerId: 1,
        date: hasDate ? getISODateTimeWithOffset(dayOffset, 0, 0) : null,
      });

      noteCount++;
    }

    currentDate.setDate(currentDate.getDate() + 1);
    dayOffset++;
  }

  return notes;
})();
