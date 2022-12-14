/**
 * ✅ Node | Vite | React
 */

import randomBytes from 'randombytes';

const tokenGenerate = (size = 32) =>
   randomBytes(Math.ceil(size / 2))
      .toString('hex')
      .substring(0, size);

export default tokenGenerate;
