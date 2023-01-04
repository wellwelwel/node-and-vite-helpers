/**
 * ✅ Node | Vite | React
 */
import { Locales, TimeZones, Months } from '../types.js';
declare const _default: {
    toLocaleString: (date: Date, options?: {
        locale?: Locales | undefined;
        timeZone?: TimeZones | undefined;
    } | undefined) => string;
    toYodaString: (date: Date, options?: {
        timeZone?: TimeZones | undefined;
    } | undefined) => string;
    pastDate: (date: Date, days: number, options?: {
        timeZone?: TimeZones | undefined;
    } | undefined) => Date;
    futureDate: (date: Date, days: number, options?: {
        timeZone?: TimeZones | undefined;
    } | undefined) => Date;
    toLocaleDate: (date: Date, options?: {
        timeZone?: TimeZones | undefined;
    } | undefined) => Date;
    isEqual: (date: Date, compareDate: Date) => boolean;
    isSmaller: (date: Date, compareDate: Date) => boolean;
    isBigger: (date: Date, compareDate: Date) => boolean;
    isSmallerOrEqual: (date: Date, compareDate: Date) => boolean;
    isBiggerOrEqual: (date: Date, compareDate: Date) => boolean;
    isBetween: (startDate: Date, date: Date, endDate: Date) => boolean;
    parse: (date: Date) => {
        year: number;
        month: number;
        day: number;
        hours: number;
        minutes: number;
        seconds: number;
    };
    diff: (date: Date, compareDate: Date) => {
        situation: "passed" | "remaining";
        years: number;
        months: number;
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
    };
    isWeek: (date: Date, options?: {
        timeZone?: TimeZones | undefined;
    } | undefined) => boolean;
    isWeekend: (date: Date, options?: {
        timeZone?: TimeZones | undefined;
    } | undefined) => boolean;
    isHoliday: (date: Date) => boolean;
    getBusinessDate: (date: Date, days?: number, options?: {
        timeZone?: TimeZones | undefined;
    } | undefined) => Date;
    set: {
        locale: (locale: Locales) => void;
        timeZone: (timeZone: TimeZones) => void;
        comercailHours: (comercailHours: [string, string]) => void;
        holidays: (holidays: Months) => void;
    };
    get: {
        locale: () => Locales;
        timeZone: () => TimeZones;
        comercailHours: () => string[];
        holidays: () => Months;
    };
};
export default _default;
