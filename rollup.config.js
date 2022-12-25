import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
   input: 'src/index.ts',
   plugins: [typescript({ tsconfig: './tsconfig.json' }), nodeResolve({ jsnext: true }), commonjs()],
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
