import { existsSync, watch as watchFile } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { parseArgs } from 'node:util';

import autoprefixer from 'autoprefixer';
import { build, type BuildOptions, context } from 'esbuild';
import copyPlugin from 'esbuild-copy-static-files';
import { dtsPlugin } from 'esbuild-plugin-d.ts';
import { sassPlugin } from 'esbuild-sass-plugin';
import postcss from 'postcss';
import postcssPresetEnv from 'postcss-preset-env';

import { createServer } from './esbuild.server.js';
import { barrelsbyPlugin } from './esbuild-barrelsby.plugin.js';
import { dtsAliasesPlugin } from './esbuild-declaration-aliases.plugin.js';

import BREAKPOINTS from './breakpoints.json' assert { type: 'json' };
import MANIFEST from './package.json' assert { type: 'json' };

export const external = ['@lit/reactive-element', 'lit', 'lit-element', 'lit-html'];

// inject some global sass variables
const precompile = (source: string, path: string): string => {
  if (path.endsWith('breakpoint.mixin.scss')) {
    const breakpoints = Object.entries(BREAKPOINTS).reduce(
      (acc, [key, value]) => `${acc}  ${key}: ${value}px,\n`,
      '\n',
    );
    return source.replace(/(\$breakpoints: \()(\);)/, `$1${breakpoints}$2`);
  }
  return source;
};

// add postcss to sass transformer
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
  values: { port = '3500', watch },
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
  // do not bundle the runtime, instead use the one provided by the consuming app
  external,
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

// set WCP version globally
if (window.wcp.version !== undefined && window.wcp.version !== '${MANIFEST.version}') {
  console.warn('[wcp] ${MANIFEST.version}: Another version (' + window.wcp.version + ') has already been loaded.');
} else window.wcp.version = '${MANIFEST.version}';

// set breakpoints globally
window.wcp.breakpoints = {
${Object.entries(BREAKPOINTS).reduce((acc, [key, value]) => `${acc}  ${key}: ${value},\n`, '')}};
`,
  },
  plugins: [
    barrelsbyPlugin({ configPath: '.barrelsby.json', addMissingJsExtensions: true }),
    dtsPlugin(),
    dtsAliasesPlugin({ tsConfigPath: 'tsconfig.types.json' }),

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
    ...external.map((ext) =>
      copyPlugin({
        src: `node_modules/${ext}`,
        dest: `dist/runtime/${ext}`,
      }),
    ),
  ],
};

if (watch) {
  // start dev server in watch mode
  const internalPort = 28487;
  const server = createServer(internalPort);
  const manifestPath = resolve(options.outdir!, 'custom-elements.json');

  // prepare context and start watching
  const ctx = await context({
    ...options,
    banner: { js: `${server.reloadBanner('wcp-hot-reload')}\n${options.banner?.js ?? ''}` },
  });
  await ctx.watch();
  await ctx.serve({ servedir: options.outdir, port: internalPort });

  // prepare dev server
  server.listen(Number(port), async () => {
    // notify user
    const url = `http://127.0.0.1:${port}/`;
    // eslint-disable-next-line no-console
    console.info(` > Preview: \x1b[4m${url}\x1b[0m\n\n`);

    // as the docs are maybe not ready yet, touch the target already
    if (!existsSync(manifestPath)) await writeFile(manifestPath, '{}', 'utf-8');
    watchFile(manifestPath, async () => {
      const manifest = await readFile(manifestPath, 'utf-8');
      server.respond(manifest);
    });
  });
} else {
  await build(options);
}
