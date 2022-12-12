/**
 * ✅ Node | Vite | React
 **/

const cx = (...args) =>
   [...new Set(args.filter((arg) => typeof arg === 'string' && arg?.trim().length > 0).map((arg) => arg?.trim() || ''))]
      .join(' ')
      .replace(/\s+/g, ' ')
      ?.trim() || '';

export default cx;
