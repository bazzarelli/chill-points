import { DateTime } from "luxon";

export const DAYS_IN_WEEK = 7;

// used for friendly display of current week dates
const now = DateTime.local();
const startOfWeek = now.startOf("week").set({ weekday: 1 });
const endOfWeek = startOfWeek.endOf("week");

export const getWeekDateString = `${startOfWeek.toFormat(
  "LLL d",
)} - ${endOfWeek.toFormat("LLL d, yyyy")}`;

// used for db queries in ISO UTC format
const nowUTC = DateTime.utc();
const nowUTCLocal = nowUTC.toLocal();
export const startOfWeekUTCToISO = nowUTCLocal
  .startOf("week")
  .set({ weekday: 1 })
  .toISO();
export const endOfWeekUTCToISO = nowUTCLocal.endOf("week").toISO();
