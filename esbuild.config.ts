import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';

import { type BuildOptions, build, context } from 'esbuild';
import copyPlugin from 'esbuild-copy-static-files';
import { sassPlugin } from 'esbuild-sass-plugin';

import autoprefixer from 'autoprefixer';
import postcss from 'postcss';
import postcssPresetEnv from 'postcss-preset-env';

import BREAKPOINTS from './breakpoints.json' assert { type: 'json' };
import pkg from './package.json' assert { type: 'json' };

// https://stackoverflow.com/q/46745014
export const __dirname = fileURLToPath(new URL('.', import.meta.url));

// inject some global sass variables
const precompile = (source: string, path: string): string => {
  if (path.endsWith('breakpoint.mixin.scss')) {
    const breakpoints = Object.entries(BREAKPOINTS).reduce((acc, [key, value]) => `${acc}  ${key}: ${value}px,\n`, '\n');
    return source.replace(/(\$breakpoints: \()(\);)/, `$1${breakpoints}$2`);
  }
  return source;
};

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
  banner: {
    js: `// prepare global namespace
  if (!window.wcp) window.wcp = {};
  if (!window.wcp.def) window.wcp.def = {};
  
  // set WCP version globally
  if (window.wcp.def.version) {
    console.warn('[wcp] ${pkg.version}: Another version (' + window.wcp.def.version + ') has already been loaded.');
  } else window.wcp.def.version = '${pkg.version}';

  // set breakpoints globally
  window.wcp.def.breakpoints = {
${Object.entries(BREAKPOINTS).reduce((acc, [key, value]) => `${acc}    ${key}: ${value},\n`, '')}
  };
`,
  },
  plugins: [
    sassPlugin({
      type: 'css-text',
      filter: /\.css$/,
      precompile,
      importMapper,
      transform,
    }),
    sassPlugin({
      type: 'css-text',
      filter: /\.(component|mixin|plugin)\.scss$/,
      precompile,
      importMapper,
      transform,
    }),
    sassPlugin({
      type: 'css',
      precompile,
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
    const reloadBanner = ` if (typeof EventSource !== 'undefined') { new EventSource('/esbuild').addEventListener('change', () => location.reload()) }`;
    const green = (message: string) => (ci ? message : `\u001b[32m${message}\u001b[0m`);
    const cyan = (message: string) => (ci ? message : `\u001b[36m${message}\u001b[0m`);

    // start dev server in watch mode
    const ctx = await context({ ...options, banner: { js: `${reloadBanner}\n${options.banner?.js ?? ''}` } });
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
