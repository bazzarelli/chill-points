export const DAYS_IN_WEEK = 7;
export const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
export const MONTHS_ABRV = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export const getWeekDateString = () => {
  const today = new Date;
  const firstDayOfWeek = new Date(new Date().setDate(today.getDate() - today.getDay()));
  const lastDayOfWeek = new Date(new Date().setDate(today.getDate() - today.getDay() + 6));
  const first = {
    day: firstDayOfWeek.getDate(),
    month: MONTHS_ABRV[firstDayOfWeek.getMonth()],
    year: firstDayOfWeek.getFullYear(),
  };
  const last = {
    day: lastDayOfWeek.getDate(),
    month: MONTHS_ABRV[lastDayOfWeek.getMonth()],
    year: lastDayOfWeek.getFullYear(),
  };

  if (first.year !== last.year)
    return `${first.month} ${first.day}, ${first.year} - ${last.month} ${last.day}, ${last.year}`;

  if (first.month !== last.month)
    return `${first.month} ${first.day} - ${last.month} ${last.day}, ${last.year}`;

  return `${first.month} ${first.day} - ${last.day}, ${last.year}`;
};