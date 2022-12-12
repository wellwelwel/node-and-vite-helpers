/**
 * ✅ Node
 * ❌ Vite | React
 */

import { randomBytes } from 'crypto';

const tokenGenerate = (size = 32) =>
   randomBytes(Math.ceil(size / 2))
      .toString('hex')
      .substring(0, size);

export default tokenGenerate;
