/**
 * ✅ Node | Vite | React
 */

import { Locales, TimeZones, Months } from './types.js';

let defaultLocale: Locales = 'pt-BR';
let defaultTimeZone: TimeZones = 'America/Sao_Paulo';
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

export const set = {
   locale: (locale: Locales) => {
      defaultLocale = locale;
   },
   timeZone: (timeZone: TimeZones) => {
      defaultTimeZone = timeZone;
   },
   comercailHours: (comercailHours: [string, string]) => {
      defaultComercialHours = comercailHours;
   },
   holidays: (holidays: Months) => {
      defaultHolidays = holidays;
   },
};

export const get = {
   locale: () => defaultLocale,
   timeZone: () => defaultTimeZone,
   comercailHours: () => defaultComercialHours,
   holidays: () => defaultHolidays,
};

export const toLocaleDate = (date: Date, options?: { timeZone?: TimeZones }): Date => {
   const timeZone = options?.timeZone || defaultTimeZone;
   const dateUTC = date.toLocaleString('pt-BR', {
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

   gmtDate += getDate.split('/').reverse().join('-');
   gmtDate += 'T';
   gmtDate += getTime;
   gmtDate += '.';
   gmtDate += '000';
   gmtDate += 'Z';

   return new Date(gmtDate);
};

export const pastDate = (date: Date, days: number, options?: { timeZone?: TimeZones }) => {
   const dateClone = new Date(date);
   const baseDate = new Date(dateClone.getTime());
   const newDate = new Date(dateClone.setDate(baseDate.getDate() - days));
   const timeZone = options?.timeZone || defaultTimeZone;

   return toLocaleDate(newDate, { timeZone });
};

export const futureDate = (date: Date, days: number, options?: { timeZone?: TimeZones }) => {
   const dateClone = new Date(date);
   const baseDate = new Date(dateClone.getTime());
   const newDate = new Date(dateClone.setDate(baseDate.getDate() + days));
   const timeZone = options?.timeZone || defaultTimeZone;

   return toLocaleDate(newDate, { timeZone });
};

export const toLocaleString = (date: Date, options?: { locale?: Locales; timeZone?: TimeZones }): string => {
   const locale = options?.locale || defaultLocale;
   const timeZone = options?.timeZone || defaultTimeZone;

   return new Date(date).toLocaleString(locale, { timeZone });
};

export const toYodaString = (date: Date, options?: { timeZone?: TimeZones }): string => {
   const timeZone = options?.timeZone || defaultTimeZone;
   const date8601 = toLocaleDate(date, { timeZone }).toISOString();

   const ISO = date8601.replace(/\.[0-9]{3}Z$/, '').replace(/T/, ' ');

   return ISO;
};

export const isEqual = (date: Date, compareDate: Date) => date.getTime() === compareDate.getTime();

export const isSmaller = (date: Date, compareDate: Date) => date.getTime() < compareDate.getTime();

export const isBigger = (date: Date, compareDate: Date) => date.getTime() > compareDate.getTime();

export const isSmallerOrEqual = (date: Date, compareDate: Date) => date.getTime() <= compareDate.getTime();

export const isBiggerOrEqual = (date: Date, compareDate: Date) => date.getTime() >= compareDate.getTime();

export const isBetween = (startDate: Date, date: Date, endDate: Date) =>
   isBiggerOrEqual(date, startDate) && isSmallerOrEqual(date, endDate);

export const parse = (date: Date) => {
   return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      hours: date.getHours(),
      minutes: date.getMinutes(),
      seconds: date.getSeconds(),
   };
};

export const diff = (
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
   const situation = isBigger(date, compareDate) ? 'passed' : 'remaining';
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

export const isWeek = (date: Date, options?: { timeZone?: TimeZones }) => {
   const timeZone = options?.timeZone || defaultTimeZone;
   const weekday = date.toLocaleDateString('en-US', { weekday: 'long', timeZone });

   return !/saturday|sunday/gi.test(weekday);
};

export const isWeekend = (date: Date, options?: { timeZone?: TimeZones }) => {
   const timeZone = options?.timeZone || defaultTimeZone;
   const weekday = date.toLocaleDateString('en-US', { weekday: 'long', timeZone });

   return /saturday|sunday/gi.test(weekday);
};

export const isHoliday = (date: Date) => {
   const day = date.getDate();
   const month = date.getMonth() + 1;
   const holiday = defaultHolidays?.[month as keyof Months] || false;

   if (!holiday) return false;

   return holiday.includes(day);
};

const getNextBusinessDate = (date: Date): Date => {
   let nextWorkDay = futureDate(new Date(date), 1, { timeZone: 'UTC' });

   return isWeekend(nextWorkDay) || isHoliday(nextWorkDay) ? getNextBusinessDate(nextWorkDay) : nextWorkDay;
};

export const getBusinessDate = (date: Date, days: number = 1, options?: { timeZone?: TimeZones }) => {
   const timeZone = options?.timeZone || defaultTimeZone;

   let searchWorkDate = new Date(date);

   for (let i = 0; i < days; i++) searchWorkDate = getNextBusinessDate(searchWorkDate);

   return toLocaleDate(searchWorkDate, { timeZone });
};
