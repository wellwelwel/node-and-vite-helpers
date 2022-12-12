/**
 * ✅ Node | Vite | React
 */

const forceArray = (input) => {
   if (Array.isArray(input)) return input || [];
   return [input] || [];
};

export default forceArray;
