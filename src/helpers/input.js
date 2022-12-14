/**
 * ✅ Node | Vite | React
 */

import { decode, encode } from 'html-entities';

export const striptags = (string, secure = true) =>
   (secure
      ? decode(String(string?.trim() || ''))
           .replace(/(<([^>]+)>)/gm, '')
           .replace(/\s{2,}/gm, ' ')
           ?.trim() || ''
      : String(string?.trim() || '')
           .replace(/(<([^>]+)>)/gm, '')
           .replace(/\s{2,}/gm, ' ')
           ?.trim() || '') || '';

export const entities = {
   decode: (string, secure = true) =>
      (secure ? striptags(decode(string?.trim() || ''), false) : decode(string?.trim() || '')) || '',
   encode: (string) => encode(string?.trim() || '', { mode: 'nonAsciiPrintable' }) || '',
};

export const xss = (string) => entities.encode(striptags(entities.decode(String(string))))?.trim() || '';
