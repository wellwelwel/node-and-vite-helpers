/**
 * ✅ Node | Vite | React
 */

import { Locales, Timezones, Months } from '../types.js';

let defaultLocale: Locales = 'pt-BR';
let defaultTimezone: Timezones = 'America/Sao_Paulo';
let defaultComercialHours = ['08:00', '18:00'];
let defaultHolidays: Months = {
   // https://www.in.gov.br/web/dou/-/portaria-me-n-11.090-de-27-de-dezembro-de-2022-454503426
   1: [1, 2],
   2: [20, 21],
   3: [],
   4: [7, 21],
   5: [1],
   6: [8],
   7: [],
   8: [],
   9: [7],
   10: [12],
   11: [2, 15],
   12: [24, 25, 31],
};

const set = {
   locale: (local: Locales) => {
      defaultLocale = local;
   },
   timeZone: (timeZone: Timezones) => {
      defaultTimezone = timeZone;
   },
   comercailHours: (comercailHours: [string, string]) => {
      defaultComercialHours = comercailHours;
   },
   holidays: (holidays: Months) => {
      defaultHolidays = holidays;
   },
};

const get = {
   locale: () => defaultLocale,
   timeZone: () => defaultTimezone,
   comercailHours: () => defaultComercialHours,
   holidays: () => defaultHolidays,
};

const toLocalDate = (date: Date, options?: { timeZone?: Timezones }): Date => {
   const timeZone = options?.timeZone || defaultTimezone;
   const dateUTC = date.toLocaleString('eu', {
      timeZone,
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
   });

   const [getDate, getTime] = dateUTC.split(' ');

   let gmtDate = '';

   gmtDate += getDate.replace(/\//g, '-');
   gmtDate += 'T';
   gmtDate += getTime;
   gmtDate += '.';
   gmtDate += '000';
   gmtDate += 'Z';

   return new Date(gmtDate);
};

const pastDate = (date: Date, days: number, options?: { timeZone?: Timezones }) => {
   const dateClone = new Date(date);
   const baseDate = new Date(dateClone.getTime());
   const newDate = new Date(dateClone.setDate(baseDate.getDate() - days));
   const timeZone = options?.timeZone || defaultTimezone;

   return toLocalDate(newDate, { timeZone });
};

const futureDate = (date: Date, days: number, options?: { timeZone?: Timezones }) => {
   const dateClone = new Date(date);
   const baseDate = new Date(dateClone.getTime());
   const newDate = new Date(dateClone.setDate(baseDate.getDate() + days));
   const timeZone = options?.timeZone || defaultTimezone;

   return toLocalDate(newDate, { timeZone });
};

const toLocaleString = (date: Date, options?: { local?: Locales; timeZone?: Timezones }): string => {
   const local = options?.local || defaultLocale;
   const timeZone = options?.timeZone || defaultTimezone;

   return new Date(date).toLocaleString(local, { timeZone });
};

const toYodaString = (date: Date, options?: { timeZone?: Timezones }): string => {
   const timeZone = options?.timeZone || defaultTimezone;
   const date8601 = toLocalDate(date, { timeZone }).toISOString();

   const ISO = date8601.replace(/\.[0-9]{3}Z$/, '').replace(/T/, ' ');

   return ISO;
};

const isEqual = (date: Date, compareDate: Date) => date.getTime() === compareDate.getTime();

const isMinor = (date: Date, compareDate: Date) => date.getTime() < compareDate.getTime();

const isMajor = (date: Date, compareDate: Date) => date.getTime() > compareDate.getTime();

const isMinorOrEqual = (date: Date, compareDate: Date) => date.getTime() >= compareDate.getTime();

const isMajorOrEqual = (date: Date, compareDate: Date) => date.getTime() <= compareDate.getTime();

const parse = (date: Date) => {
   return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      hours: date.getHours(),
      minutes: date.getMinutes(),
      seconds: date.getSeconds(),
   };
};

const getDiff = (
   date: Date,
   compareDate: Date
): {
   situation: 'passed' | 'remaining';
   years: number;
   months: number;
   days: number;
   hours: number;
   minutes: number;
   seconds: number;
} => {
   const situation = isMajor(date, compareDate) ? 'passed' : 'remaining';
   const milliseconds = Math.abs(date.getTime() - compareDate.getTime());
   const seconds = Math.floor((milliseconds / 1000) % 60);
   const minutes = Math.floor((milliseconds / 1000 / 60) % 60);
   const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);
   const days = Math.floor((milliseconds / (1000 * 60 * 60 * 24)) % 30);
   const months = Math.floor((milliseconds / (1000 * 60 * 60 * 24 * 30)) % 12);
   const years = Math.floor(milliseconds / (1000 * 60 * 60 * 24 * 365));

   return {
      situation,
      years,
      months,
      days,
      hours,
      minutes,
      seconds,
   };
};

const isWeekend = (date: Date, options?: { timeZone?: Timezones }) => {
   const timeZone = options?.timeZone || defaultTimezone;
   const weekday = date.toLocaleDateString('en-US', { weekday: 'long', timeZone });

   return /saturday|sunday/gi.test(weekday);
};

const isHoliday = (date: Date) => {
   const day = date.getDate();
   const month = date.getMonth() + 1;
   const holiday = defaultHolidays?.[month as keyof Months] || false;

   if (!holiday) return false;

   return holiday.includes(day);
};

const getNextBusinessDay = (date: Date): Date => {
   let nextWorkDay = futureDate(new Date(date), 1, { timeZone: 'UTC' });

   return isWeekend(nextWorkDay) || isHoliday(nextWorkDay) ? getNextBusinessDay(nextWorkDay) : nextWorkDay;
};

const getBusinessDay = (date: Date, days: number = 1, options?: { timeZone?: Timezones }) => {
   const timeZone = options?.timeZone || defaultTimezone;

   let searchWorkDate = new Date(date);

   for (let i = 0; i < days; i++) searchWorkDate = getNextBusinessDay(searchWorkDate);

   return toLocalDate(searchWorkDate, { timeZone });
};

export default {
   toLocaleString,
   toYodaString,
   pastDate,
   futureDate,
   toLocalDate,
   isEqual,
   isMinor,
   isMajor,
   isMinorOrEqual,
   isMajorOrEqual,
   parse,
   getDiff,
   isWeekend,
   isHoliday,
   getBusinessDay,

   set,
   get,
};
