/**
 * ✅ Node | Vite | React
 */
import { Locales, Timezones, Months } from '../types.js';
declare const _default: {
    toLocaleString: (date: Date, options?: {
        local?: Locales | undefined;
        timeZone?: Timezones | undefined;
    } | undefined) => string;
    toYodaString: (date: Date, options?: {
        timeZone?: Timezones | undefined;
    } | undefined) => string;
    pastDate: (date: Date, days: number, options?: {
        timeZone?: Timezones | undefined;
    } | undefined) => Date;
    futureDate: (date: Date, days: number, options?: {
        timeZone?: Timezones | undefined;
    } | undefined) => Date;
    toLocalDate: (date: Date, options?: {
        timeZone?: Timezones | undefined;
    } | undefined) => Date;
    isEqual: (date: Date, compareDate: Date) => boolean;
    isMinor: (date: Date, compareDate: Date) => boolean;
    isMajor: (date: Date, compareDate: Date) => boolean;
    isMinorOrEqual: (date: Date, compareDate: Date) => boolean;
    isMajorOrEqual: (date: Date, compareDate: Date) => boolean;
    parse: (date: Date) => {
        year: number;
        month: number;
        day: number;
        hours: number;
        minutes: number;
        seconds: number;
    };
    getDiff: (date: Date, compareDate: Date) => {
        situation: "passed" | "remaining";
        years: number;
        months: number;
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
    };
    isWeekend: (date: Date, options?: {
        timeZone?: Timezones | undefined;
    } | undefined) => boolean;
    isHoliday: (date: Date) => boolean;
    getBusinessDay: (date: Date, days?: number, options?: {
        timeZone?: Timezones | undefined;
    } | undefined) => Date;
    set: {
        locale: (local: Locales) => void;
        timeZone: (timeZone: Timezones) => void;
        comercailHours: (comercailHours: [string, string]) => void;
        holidays: (holidays: Months) => void;
    };
    get: {
        locale: () => Locales;
        timeZone: () => Timezones;
        comercailHours: () => string[];
        holidays: () => Months;
    };
};
export default _default;
