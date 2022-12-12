/**
 * ✅ Node | Vite | React
 */

const times = {
   s: (time) => parseInt(time) * 1000,
   m: (time) => parseInt(time) * 1000 * 60,
   h: (time) => parseInt(time) * 1000 * 60 * 60,
   d: (time) => parseInt(time) * 1000 * 60 * 60 * 24,
};

const setTime = (time) => {
   if (+time) return +time;

   const splitTime = time.match(/^([0-9]+)(d|h|m|s)$/);
   const number = splitTime?.[1];
   const method = splitTime?.[2];

   if (!number || !method)
      throw new Error(`setTime("${time}"): Time format invalid\nExamples of using: "5s", "5m", "5h", "5d"`);

   return times[String(method).toLowerCase()](number);
};

export default setTime;
