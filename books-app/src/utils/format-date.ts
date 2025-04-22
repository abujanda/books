import { format, fromUnixTime } from "date-fns";
import { DateTime } from "luxon";

export const timeZone = (): string => {
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const now = DateTime.local().setZone(userTimeZone);

  return now.toFormat("z");
};

export const unixEpoch = (
  epoch?: number,
  includeTime: boolean = false,
  overrideShortDateFormat?: boolean
): string => {
  if (!epoch) return "";

  const today = new Date();
  const d = new Date(epoch * 1000); // multiply by 1000 to convert seconds to milliseconds

  let dateFormat =
    today.getFullYear() === new Date(d).getFullYear() ? "MMM d" : "MMM d, yyyy";

  // Override short date format
  // for dates that fall within
  // this year
  if (overrideShortDateFormat) {
    dateFormat = "MMM d, yyyy";
  }

  if (includeTime) dateFormat += ", h:mm a";

  return format(fromUnixTime(epoch), dateFormat);
};

export const utcToLocal = (
  utcDate: Date,
  displayDistance: boolean = false,
  includeTime: boolean = true
): string | null => {
  const utcDateTime = DateTime.fromISO(utcDate.toString(), { zone: "utc" });

  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const localDateTime = utcDateTime.setZone(userTimeZone);
  const currentDateTime = DateTime.now();

  if (displayDistance) {
    // Calculate the duration between the provided date time and current time
    const duration = currentDateTime.diff(localDateTime);

    if (duration.as("hours") <= 24) {
      // Calculate the relative time difference
      const relativeTime = localDateTime.toRelative({ base: currentDateTime });

      return relativeTime;
    }
  }

  let format =
    localDateTime.year === currentDateTime.year ? "MMM d" : "MMM d, yyyy";

  if (includeTime) format += ", h:mm a";

  // Format the Central Time date as a string
  const localDateTimeString = localDateTime.toFormat(format);

  return localDateTimeString;
};
