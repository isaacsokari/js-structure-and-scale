import pkg from './package.json';
import { terser } from 'rollup-plugin-terser';

const banner = `/*! ${pkg.name} v${pkg.version} | ${
  pkg.description
} | Copyright ${new Date().getFullYear()} | ${pkg.license} license */`;

const minify = true;

const files = ['home.js', 'places.js'];

export default files.map(function (file) {
  return {
    input: `src/${file}`,
    output: {
      file: file,
      format: 'iife',
      banner: banner,
      name: file.replace('.js', ''),
      plugins: minify ? [terser()] : null,
      sourcemap: minify,
    },
  };
});
