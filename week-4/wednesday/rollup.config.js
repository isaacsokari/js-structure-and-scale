import pkg from './package.json';

const banner = `/*! ${pkg.name} v${pkg.version} | ${
  pkg.description
} | Copyright ${new Date().getFullYear()} | ${pkg.license} license */`;

const formats = ['iife', 'cjs', 'es'];

export default formats.map(function (format) {
  return {
    input: './src/time.js',
    output: {
      file: `./dist/time${format === 'iife' ? '' : `.${format}`}.js`,
      format: format,
      name: 'Time',
      banner: banner,
    },
  };
});
