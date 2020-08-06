import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'src/index.ts',
  output: [{
    file: 'dist/remarc.umd.js',
    format: 'umd',
    name: 'Remarc',
    indent: false,
  }, {
    file: 'dist/remarc.common.js',
    format: 'cjs',
  }],
  plugins: [
    typescript(),
  ],
};