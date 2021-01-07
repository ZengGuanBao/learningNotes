// rollup.config.js
export default {
  input: 'src/index.js',
  output: {
    file: 'dist/hzed.microspot.js',
    format: 'es',
    minify: true // 代码是否压缩
  }
};