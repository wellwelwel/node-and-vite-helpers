import { Locales, Timezones } from '../types.js';
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
    setLocale: (local: Locales) => void;
    setTimezone: (timezone: Timezones) => void;
    setHolidays: (holidaysList: string[]) => string[];
};
export default _default;
