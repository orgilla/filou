import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import resolve from 'rollup-plugin-node-resolve';
import sourceMaps from 'rollup-plugin-sourcemaps';
import json from 'rollup-plugin-json';

export default {
  input: './index.ts',
  output: [
    {
      file: './index.browser.js',
      name: 'filou',
      format: 'umd',
      sourcemap: false,
      exports: 'named',
    },
    {
      file: './index.umd.js',
      name: 'filou',
      format: 'umd',
      sourcemap: true,
      exports: 'named',
    },
    {
      file: './index.es5.js',
      format: 'es',
      sourcemap: true,
      exports: 'named',
    },
  ],
  watch: {
    include: ['*.ts', '*.tsx'],
  },
  plugins: [
    json(),
    external(),
    typescript({
      outDir: './dist',
    }),
    resolve({
      extensions: ['.ts', '.tsx', '.js', '.json'],
    }),
    commonjs(),
    sourceMaps(),
  ],
};
