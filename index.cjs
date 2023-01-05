'use strict';

var htmlEntities = require('html-entities');

/**
 * ✅ Node | Vite | React
 **/
const cx = (...args) => [
    ...new Set(args.filter((arg) => typeof arg === 'string' && arg?.trim().length > 0).map((arg) => arg?.trim() || '')),
]
    .join(' ')
    .replace(/\s+/g, ' ')
    ?.trim() || '';

/**
 * ✅ Node | Vite | React
 **/
const isEmpty = (str) => str?.trim().length === 0;
const notEmpty = (str) => str?.trim().length > 0;

/**
 * ✅ Node | Vite | React
 */
const forceArray = (input) => {
    if (Array.isArray(input))
        return input || [];
    return [input] || [];
};

/**
 * ✅ Vite | React
 * ❌ Node
 **/
function s(element) {
    return document.querySelector(element);
}
function sEl(baseElement, element) {
    return baseElement.querySelector(element);
}
function sAll(element) {
    return document.querySelectorAll(element);
}
function sElAll(baseElement, element) {
    return baseElement.querySelectorAll(element);
}

/**
 * ✅ Vite | React
 * ❌ Node
 */
const mimes = {
    gif: 'image/gif',
    ico: 'image/x-icon',
    icon: 'image/x-icon',
    jpeg: 'image/jpeg',
    jpg: 'image/jpeg',
    png: 'image/png',
    svg: 'image/svg+xml',
    webp: 'image/webp',
};
const createElement = (options) => {
    const element = document.createElement(options.element);
    options?.attributes &&
        options.attributes.forEach((attribute) => element.setAttribute(attribute.name, attribute?.value || ''));
    if (options?.textContext)
        element.textContent = options.textContext;
    document.head.appendChild(element);
};
const title = (text) => {
    const current = s('head title');
    // If already exists
    if (current) {
        current.textContent = text;
        return;
    }
    createElement({ element: 'title', textContext: text });
};
const favicon = (importedIcon) => {
    const current = s('head link[rel="icon"]');
    const type = mimes[importedIcon?.split('.')?.pop()?.toLowerCase()];
    // If already exists
    if (current) {
        current.href = importedIcon;
        current.type = type;
        return;
    }
    createElement({
        element: 'link',
        attributes: [
            {
                name: 'rel',
                value: 'icon',
            },
            {
                name: 'href',
                value: importedIcon,
            },
            {
                name: 'type',
                value: type,
            },
        ],
    });
};
const faviconBase64 = (base64) => {
    const current = s('head link[rel="icon"]');
    const type = mimes[base64?.match(/image\/(.+);/)?.[1]?.toLowerCase()];
    // If already exists
    if (current) {
        current.href = base64;
        current.type = type;
        return;
    }
    createElement({
        element: 'link',
        attributes: [
            {
                name: 'rel',
                value: 'icon',
            },
            {
                name: 'href',
                value: base64,
            },
            {
                name: 'type',
                value: type,
            },
        ],
    });
};
const meta = (name, content) => {
    const current = s(`head meta[name="${name}"]`);
    // If already exists
    if (current) {
        current.content = content;
        return;
    }
    createElement({
        element: 'meta',
        attributes: [
            {
                name: 'name',
                value: name,
            },
            {
                name: 'content',
                value: content,
            },
        ],
    });
};
const link = (rel, href) => {
    const current = s(`head link[rel="${rel}"]`);
    // If already exists
    if (current) {
        current.href = href;
        return;
    }
    createElement({
        element: 'link',
        attributes: [
            {
                name: 'rel',
                value: rel,
            },
            {
                name: 'href',
                value: href,
            },
        ],
    });
};
const head = { title, favicon, faviconBase64, meta, link, createElement };

/**
 * ✅ Node | Vite | React
 */
const striptags = (string, secure = true) => (secure
    ? htmlEntities.decode(String(string?.trim() || ''))
        .replace(/(<([^>]+)>)/gm, '')
        .replace(/\s{2,}/gm, ' ')
        ?.trim() || ''
    : String(string?.trim() || '')
        .replace(/(<([^>]+)>)/gm, '')
        .replace(/\s{2,}/gm, ' ')
        ?.trim() || '') || '';
const entities = {
    decode: (string, secure = true) => (secure ? striptags(htmlEntities.decode(string?.trim() || ''), false) : htmlEntities.decode(string?.trim() || '')) || '',
    encode: (string) => htmlEntities.encode(string?.trim() || '', { mode: 'nonAsciiPrintable' }) || '',
};
const xss = (string) => entities.encode(striptags(entities.decode(String(string))))?.trim() || '';

/**
 * ✅ Node | Vite | React
 */
const times = {
    s: (time) => parseInt(time) * 1000,
    m: (time) => parseInt(time) * 1000 * 60,
    h: (time) => parseInt(time) * 1000 * 60 * 60,
    d: (time) => parseInt(time) * 1000 * 60 * 60 * 24,
};
const error = 'Time format invalid\nExamples of using: "5s", "5m", "5h", "5d"';
const setTime = (time) => {
    if (+time)
        return +time;
    if (typeof time !== 'string')
        throw new Error(error);
    const splitTime = time.match(/^([0-9]+)(d|h|m|s)$/);
    const number = splitTime?.[1];
    const method = splitTime?.[2];
    if (!number || !method)
        throw new Error(error);
    return times[String(method).toLowerCase()](number);
};

/**
 * ✅ Node | Vite | React
 */
const generateRandomHexadecimal = () => Math.floor(Math.random() * 16).toString(16);
const tokenGenerate = (tokenSize = 32) => {
    const token = [];
    for (let size = 0; size < tokenSize; size++)
        token.push(generateRandomHexadecimal());
    return token.join('');
};

/**
 * ✅ Node | Vite | React
 */
let defaultLocale = 'pt-BR';
let defaultTimeZone = 'America/Sao_Paulo';
let defaultComercialHours = ['08:00', '18:00'];
let defaultHolidays = {
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
    locale: (locale) => {
        defaultLocale = locale;
    },
    timeZone: (timeZone) => {
        defaultTimeZone = timeZone;
    },
    comercailHours: (comercailHours) => {
        defaultComercialHours = comercailHours;
    },
    holidays: (holidays) => {
        defaultHolidays = holidays;
    },
};
const get = {
    locale: () => defaultLocale,
    timeZone: () => defaultTimeZone,
    comercailHours: () => defaultComercialHours,
    holidays: () => defaultHolidays,
};
const toLocaleDate = (date, options) => {
    const timeZone = options?.timeZone || defaultTimeZone;
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
const pastDate = (date, days, options) => {
    const dateClone = new Date(date);
    const baseDate = new Date(dateClone.getTime());
    const newDate = new Date(dateClone.setDate(baseDate.getDate() - days));
    const timeZone = options?.timeZone || defaultTimeZone;
    return toLocaleDate(newDate, { timeZone });
};
const futureDate = (date, days, options) => {
    const dateClone = new Date(date);
    const baseDate = new Date(dateClone.getTime());
    const newDate = new Date(dateClone.setDate(baseDate.getDate() + days));
    const timeZone = options?.timeZone || defaultTimeZone;
    return toLocaleDate(newDate, { timeZone });
};
const toLocaleString = (date, options) => {
    const locale = options?.locale || defaultLocale;
    const timeZone = options?.timeZone || defaultTimeZone;
    return new Date(date).toLocaleString(locale, { timeZone });
};
const toYodaString = (date, options) => {
    const timeZone = options?.timeZone || defaultTimeZone;
    const date8601 = toLocaleDate(date, { timeZone }).toISOString();
    const ISO = date8601.replace(/\.[0-9]{3}Z$/, '').replace(/T/, ' ');
    return ISO;
};
const isEqual = (date, compareDate) => date.getTime() === compareDate.getTime();
const isSmaller = (date, compareDate) => date.getTime() < compareDate.getTime();
const isBigger = (date, compareDate) => date.getTime() > compareDate.getTime();
const isSmallerOrEqual = (date, compareDate) => date.getTime() <= compareDate.getTime();
const isBiggerOrEqual = (date, compareDate) => date.getTime() >= compareDate.getTime();
const isBetween = (startDate, date, endDate) => isBiggerOrEqual(date, startDate) && isSmallerOrEqual(date, endDate);
const parse = (date) => {
    return {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
        hours: date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds(),
    };
};
const diff = (date, compareDate) => {
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
const isWeek = (date, options) => {
    const timeZone = options?.timeZone || defaultTimeZone;
    const weekday = date.toLocaleDateString('en-US', { weekday: 'long', timeZone });
    return !/saturday|sunday/gi.test(weekday);
};
const isWeekend = (date, options) => {
    const timeZone = options?.timeZone || defaultTimeZone;
    const weekday = date.toLocaleDateString('en-US', { weekday: 'long', timeZone });
    return /saturday|sunday/gi.test(weekday);
};
const isHoliday = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const holiday = defaultHolidays?.[month] || false;
    if (!holiday)
        return false;
    return holiday.includes(day);
};
const getNextBusinessDate = (date) => {
    let nextWorkDay = futureDate(new Date(date), 1, { timeZone: 'UTC' });
    return isWeekend(nextWorkDay) || isHoliday(nextWorkDay) ? getNextBusinessDate(nextWorkDay) : nextWorkDay;
};
const getBusinessDate = (date, days = 1, options) => {
    const timeZone = options?.timeZone || defaultTimeZone;
    let searchWorkDate = new Date(date);
    for (let i = 0; i < days; i++)
        searchWorkDate = getNextBusinessDate(searchWorkDate);
    return toLocaleDate(searchWorkDate, { timeZone });
};
var dates = {
    toLocaleString,
    toYodaString,
    pastDate,
    futureDate,
    toLocaleDate,
    isEqual,
    isSmaller,
    isBigger,
    isSmallerOrEqual,
    isBiggerOrEqual,
    isBetween,
    parse,
    diff,
    isWeek,
    isWeekend,
    isHoliday,
    getBusinessDate,
    set,
    get,
};

exports.cx = cx;
exports.dates = dates;
exports.entities = entities;
exports.forceArray = forceArray;
exports.head = head;
exports.isEmpty = isEmpty;
exports.notEmpty = notEmpty;
exports.s = s;
exports.sAll = sAll;
exports.sEl = sEl;
exports.sElAll = sElAll;
exports.setTime = setTime;
exports.striptags = striptags;
exports.tokenGenerate = tokenGenerate;
exports.xss = xss;
