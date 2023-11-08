import { DateTime } from "luxon";

const now = DateTime.local();
const startOfWeek = now.startOf("week").set({ weekday: 1 });
const endOfWeek = startOfWeek.endOf("week");

export const getWeekDateString = `${startOfWeek.toFormat(
  "LLL d",
)} - ${endOfWeek.toFormat("LLL d, yyyy")}`;

export const DAYS_IN_WEEK = 7;
