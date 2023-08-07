import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';

import { type BuildOptions, build, context } from 'esbuild';
import copyPlugin from 'esbuild-copy-static-files';
import { sassPlugin } from 'esbuild-sass-plugin';

import autoprefixer from 'autoprefixer';
import postcss from 'postcss';
import postcssPresetEnv from 'postcss-preset-env';

// https://stackoverflow.com/q/46745014
export const __dirname = fileURLToPath(new URL('.', import.meta.url));

// apply postcss with autoprefixer in sass
const transform = async (source: string): Promise<string> => {
  const { css } = await postcss([autoprefixer, postcssPresetEnv({ stage: 0 })]).process(source, { from: source });
  return css;
};

// resolve @ imports in sass
const importMapper = (path: string): string => {
  if (path.includes('node_modules')) return path;
  if (path.startsWith('@')) return resolve(path.replace(/^.*@\/?/, './src/'));
  return path;
};

// parse cli arguments
const {
  values: { ci = false, port = '3500', watch },
} = parseArgs({
  options: {
    ci: { type: 'boolean' },
    port: { type: 'string', short: 'p' },
    watch: { type: 'boolean', short: 'w' },
  },
});

// prepare common build options
const options: BuildOptions = {
  sourceRoot: 'src',
  entryPoints: ['src/index.ts', 'src/index.html', 'src/styles/global.scss'],
  assetNames: '[name]',
  outdir: 'dist',
  platform: 'browser',
  format: 'esm',
  bundle: true,
  metafile: true,
  minify: true,
  treeShaking: true,
  sourcemap: true,
  loader: {
    '.html': 'copy',
    '.md': 'copy',
    '.svg': 'dataurl',
    // monaco editor ships with ttf fonts
    '.ttf': 'file',
  },
  logLevel: 'error',
  plugins: [
    sassPlugin({
      type: 'css-text',
      filter: /\.css$/,
      importMapper,
      transform,
    }),
    sassPlugin({
      type: 'css-text',
      filter: /\.(component|mixin|plugin)\.scss$/,
      importMapper,
      transform,
    }),
    sassPlugin({
      type: 'css',
      importMapper,
      transform,
    }),
    copyPlugin({
      src: 'README.md',
      dest: 'dist/README.md',
    }),
    copyPlugin({
      src: 'src/config.json',
      dest: 'dist/config.json',
    }),
    copyPlugin({
      src: 'src/config.schema.json',
      dest: 'dist/config.schema.json',
    }),
    copyPlugin({
      src: 'src/assets',
      dest: 'dist/assets',
    }),
    copyPlugin({
      src: 'node_modules/prismjs/components',
      dest: 'dist/grammars',
    }),
  ],
};

if (watch) {
  try {
    const bannerJs = ` if (typeof EventSource !== 'undefined') { new EventSource('/esbuild').addEventListener('change', () => location.reload()) }`;
    const green = (message: string) => (ci ? message : `\u001b[32m${message}\u001b[0m`);
    const cyan = (message: string) => (ci ? message : `\u001b[36m${message}\u001b[0m`);

    // start dev server in watch mode
    const ctx = await context({ ...options, banner: { js: bannerJs } });
    await ctx.watch();
    const { host: hostname } = await ctx.serve({ servedir: 'dist', port: Number(port) });

    // notify user
    console.info(`${green('>')} Server started at ${cyan(`http://${hostname}:${port}`)}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
} else {
  await build(options);
  process.exit(0);
}
