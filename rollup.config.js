// @ts-check

import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
   input: 'src/index.ts',
   external: ['html-entities'],
   plugins: [typescript({ tsconfig: './tsconfig.json' }), nodeResolve(), commonjs()],
   output: [
      {
         file: './index.cjs',
         format: 'cjs',
      },
      {
         file: './index.mjs',
         format: 'es',
      },
   ],
};
