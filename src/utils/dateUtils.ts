import { differenceInDays, differenceInWeeks, differenceInMonths, parse, startOfDay } from 'date-fns';

/**
 * Parses a DD/MM/YYYY date string into a Date object.
 * Returns null if the format is invalid.
 */
export const parseDateString = (dateStr: string): Date | null => {
  try {
    // Use date-fns parse function for robust parsing
    const parsedDate = parse(dateStr, 'dd/MM/yyyy', new Date());
    // Check if the parsed date is valid
    if (isNaN(parsedDate.getTime())) {
      console.error(`Invalid date format provided: ${dateStr}`);
      return null;
    }
    return parsedDate;
  } catch (error) {
    console.error(`Error parsing date string "${dateStr}":`, error);
    return null;
  }
};

/**
 * Calculates a human-readable timeframe string relative to the current date.
 * @param dateString The seminar date in DD/MM/YYYY format.
 * @returns A relative time string (e.g., "in 2 weeks", "next month", "past event").
 */
export const calculateTimeFrame = (dateString: string): string => {
  const seminarDate = parseDateString(dateString);
  if (!seminarDate) {
    return "Ngày không xác định"; // Return if date is invalid
  }

  const today = startOfDay(new Date()); // Use startOfDay for consistent comparison
  const seminarDayStart = startOfDay(seminarDate);

  const daysDifference = differenceInDays(seminarDayStart, today);

  if (daysDifference < 0) {
    return "Đã diễn ra";
  }
  if (daysDifference === 0) {
    return "Hôm nay";
  }
  if (daysDifference === 1) {
    return "Ngày mai";
  }
  if (daysDifference <= 7) {
    return `Còn ${daysDifference} ngày`;
  }

  const weeksDifference = differenceInWeeks(seminarDayStart, today);
  if (weeksDifference <= 4) {
    return `Còn ${weeksDifference} tuần`;
  }

  const monthsDifference = differenceInMonths(seminarDayStart, today);
  if (monthsDifference === 1) {
    return "Tháng sau";
  }
  if (monthsDifference <= 12) {
    return `Còn ${monthsDifference} tháng`;
  }

  // For events more than a year away, you might want a different format
  // For simplicity, we'll stick to months for now.
  return `Còn ${monthsDifference} tháng`;
};
