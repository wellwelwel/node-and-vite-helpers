/**
 * ✅ Node | Vite | React
 *
 * ## Remove all tags and keep the original content:
 * striptags('123 🤡') -> 123 🤡
 * striptags('<div>123 🤡</div>') -> 123 🤡
 * striptags('&lt;div&gt;123 🤡&lt;/div&gt;') -> 123 🤡
 *
 * ## Remove all tags and encode all remaining content:
 * xss('123 ≈') -> 123 &#129313;
 * xss('<div>123 🤡</div>') -> 123 &#129313;
 * xss('&lt;div&gt;123 🤡&lt;/div&gt;') -> 123 &#129313;
 *
 * ## Keep everything and just encode:
 * entities.encode('123 🤡') -> 123 &#129313;
 * entities.encode('<div>123 🤡</div>') -> &lt;div&gt;123 &#129313;&lt;/div&gt;
 *
 * ## Just decode:
 * entities.decode('123 🤡') -> 123 🤡
 * entities.decode('123 &#129313;') -> 123 🤡
 * entities.decode('<div>123 &#129313;</div>') -> <div>123 🤡</div>
 */

import { decode, encode } from 'html-entities';

export const striptags = (string) =>
   decode(String(string?.trim() || ''))
      .replace(/(<([^>]+)>)/gm, '')
      .replace(/\s{2,}/gm, ' ')
      ?.trim() || '';

export const entities = {
   decode: (string) => decode(string?.trim() || ''),
   encode: (string) => encode(string?.trim() || '', { mode: 'nonAsciiPrintable' }),
};

export const xss = (string) => entities.encode(striptags(String(string)))?.trim() || '';
