// @ts-check

import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';

const setConfig = (/** @type {string} */ srcFile) =>
   defineConfig({
      input: `./src/${srcFile}.ts`,
      external: ['html-entities'],
      plugins: [
         typescript({
            tsconfig: './tsconfig.json',
         }),
      ],
      output: [
         {
            file: `./${srcFile}.mjs`,
            format: 'es',
         },
         {
            file: `./${srcFile}.cjs`,
            format: 'cjs',
         },
      ],
   });

export default [
   setConfig('index'),
   setConfig('dates'),
   setConfig('do-class'),
   setConfig('empty'),
   setConfig('force-array'),
   setConfig('head'),
   setConfig('input'),
   setConfig('selectors'),
   setConfig('set-time'),
   setConfig('token-generate'),
];
