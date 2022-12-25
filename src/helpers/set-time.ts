/**
 * ✅ Node | Vite | React
 */

const times = {
   s: (time: string) => parseInt(time) * 1000,
   m: (time: string) => parseInt(time) * 1000 * 60,
   h: (time: string) => parseInt(time) * 1000 * 60 * 60,
   d: (time: string) => parseInt(time) * 1000 * 60 * 60 * 24,
};

const error = 'Time format invalid\nExamples of using: "5s", "5m", "5h", "5d"';

export const setTime = (time: string | number): number => {
   if (+time) return +time;
   if (typeof time !== 'string') throw new Error(error);

   const splitTime = time.match(/^([0-9]+)(d|h|m|s)$/);
   const number = splitTime?.[1];
   const method = splitTime?.[2];

   if (!number || !method) throw new Error(error);

   return times[String(method).toLowerCase() as keyof typeof times](number);
};
