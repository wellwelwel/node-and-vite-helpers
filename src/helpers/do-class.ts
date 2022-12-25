/**
 * ✅ Node | Vite | React
 **/

export const cx = (...args: string[] | unknown[]): string =>
   [
      ...new Set(
         args.filter((arg) => typeof arg === 'string' && arg?.trim().length > 0).map((arg: string) => arg?.trim() || '')
      ),
   ]
      .join(' ')
      .replace(/\s+/g, ' ')
      ?.trim() || '';
