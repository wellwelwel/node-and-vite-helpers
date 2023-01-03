import { Locales, Timezones } from '../types.js';

let defaultLocale: Locales = 'pt-BR';
let defaultTimezone: Timezones = 'America/Sao_Paulo';
let holidays: string[] = [
   '01/01', // Confraternização Universal
   '02/20', // Carnaval
   '02/21', // Carnaval
   '04/07', // Paixão de Cristo
   '04/21', // Tiradentes
   '05/01', // Dia do Trabalho
   '06/08', // Corpus Christi
   '09/07', // Independência do Brasil
   '10/12', // Nossa Sr.a Aparecida - Padroeira do Brasil
   '11/02', // Finados
   '11/15', // Proclamação da República
   '12/25', // Natal
   '12/31', // Confraternização Universal
];

const setLocale = (local: Locales) => {
   defaultLocale = local;
};

const setTimezone = (timezone: Timezones) => {
   defaultTimezone = timezone;
};

const setHolidays = (holidaysList: string[]) => {
   holidays.length = 0;
   Object.assign(holidays, [...holidaysList]);

   return holidays;
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
   setLocale,
   setTimezone,
   setHolidays,
};
