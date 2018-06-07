import camelCase from 'lodash/camelCase';
import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import resolve from 'rollup-plugin-node-resolve';
import sourceMaps from 'rollup-plugin-sourcemaps';
import json from 'rollup-plugin-json';

const pkg = require('./package.json');

export default {
  input: `src/${pkg.name}.ts`,
  output: [
    {
      file: pkg.main,
      name: camelCase(pkg.name),
      format: 'umd',
      sourcemap: true,
    },
    { file: pkg.module, format: 'es', sourcemap: true },
  ],
  watch: {
    include: ['src'],
  },
  plugins: [
    json(),
    external(),
    typescript({ useTsconfigDeclarationDir: true }),
    resolve({}),
    commonjs(),
    sourceMaps(),
  ],
};
