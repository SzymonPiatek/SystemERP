export function getISODateTimeWithOffset(daysOffset: number, hoursOffset: number, minutesOffset: number): string {
  const now = new Date();

  now.setDate(now.getDate() + daysOffset);
  now.setHours(hoursOffset);
  now.setMinutes(minutesOffset);
  now.setSeconds(0);
  now.setMilliseconds(0);

  return now.toISOString();
}
