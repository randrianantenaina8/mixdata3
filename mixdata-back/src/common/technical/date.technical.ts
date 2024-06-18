// import * as dayjs from 'dayjs';
import dayjs from 'dayjs';
// eslint-disable-next-line no-unused-vars
import * as relativeTime from 'dayjs/plugin/relativeTime';

require('dayjs/locale/fr');

const format = 'YYYY-MM-DDTHH:mm:ss.sssZ';
export const shortFormat = 'YYYY-MM-DD';
const sqlFormat = 'YYYY-MM-DDTHH:mm:ss.sssZ';

// eslint-disable-next-line no-confusing-arrow
export const formatToSQLFormat = (date: string | Date, last = false) => {
  let dayjsDate = typeof date === 'string' ? dayjs(date, shortFormat) : dayjs(date);
  dayjsDate = last ? dayjsDate.add(1, 'days') : dayjsDate;

  return dayjsDate.format(sqlFormat);
};

export const formatToShortFormat = (date: Date) => dayjs(date).format(shortFormat);

export const formatDateToLocaleWithHour = (dateHour) =>
  dayjs(dateHour, format).format('DD/MM/YYYY, à HH[h]mm');

// eslint-disable-next-line no-confusing-arrow
export const formatDateToLocale = (date, currentFormat = format) =>
  date ? dayjs(date, currentFormat).format('DD/MM/YYYY') : dayjs().format('DD/MM/YYYY');

export const toDate = (date: string) => {
  const [day, month, year] = date.split('/');
  return dayjs(`${year}-${month}-${day}`).toDate();
};

export const dayFromNow = (dateHour) => dayjs(dateHour, format).fromNow(true);

export const getWeek = (today) => {
  const firstDayOfYear: any = new Date(today.getFullYear(), 0, 1);
  const pastDaysOfYear = (today - firstDayOfYear) / 86400000;

  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};

export const getStartWeekDate = (date: Date) =>
  dayjs(new Date(date.setDate(date.getDate() - date.getDay()))).format('DD/MM/YYYY');

export const isDateBeforeNow = (date: Date | string) =>
  typeof date === 'string'
    ? dayjs(date, format).isBefore(new Date())
    : dayjs(date).isBefore(new Date());

export const transformTokenExpiryToDate = (expiresIn: number) =>
  dayjs()
    // Marge de 5minutes
    .add(expiresIn - 300, 'seconds')
    .toDate();
