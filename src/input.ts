/**
 * ✅ Node | Vite | React
 */

import { decode, encode } from 'html-entities';

const striptags = (string: string, secure = true): string =>
   (secure
      ? decode(String(string?.trim() || ''))
           .replace(/(<([^>]+)>)/gm, '')
           .replace(/\s{2,}/gm, ' ')
           ?.trim() || ''
      : String(string?.trim() || '')
           .replace(/(<([^>]+)>)/gm, '')
           .replace(/\s{2,}/gm, ' ')
           ?.trim() || '') || '';

const entities = {
   decode: (string: string, secure = true): string =>
      (secure ? striptags(decode(string?.trim() || ''), false) : decode(string?.trim() || '')) || '',
   encode: (string: string) => encode(string?.trim() || '', { mode: 'nonAsciiPrintable' }) || '',
};

const xss = (string: string): string => entities.encode(striptags(entities.decode(String(string))))?.trim() || '';

export { xss, striptags, entities };
