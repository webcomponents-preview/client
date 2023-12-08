import type { LogLevel, OnResolveResult, Plugin } from 'esbuild';
import { exec } from 'node:child_process';

import { existsSync, watchFile } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { cwd } from 'node:process';
import { promisify } from 'node:util';

export type BarrelsbyPluginOptions = {
  /**
   * Path to barrelsby config file
   */
  configPath: string;

  /**
   * Optionally add `*.js` extensions to generated barrels if missing
   */
  addMissingJsExtensions?: boolean;
};

export function barrelsbyPlugin({ configPath, addMissingJsExtensions = false }: BarrelsbyPluginOptions): Plugin {
  const pluginName = 'esbuild-plugin-barrelsby';
  return {
    name: pluginName,
    setup(build) {
      build.onResolve({ filter: /index\.ts$/ }, async ({ path, resolveDir }) => {
        // resolve the path to the index file
        const index = resolve(resolveDir, path);

        // return a promise that resolves when the watcher fires
        return new Promise<OnResolveResult | undefined>(async (done) => {
          // as we can not await the result of barrelsby directly,
          // we have to watch the file system for a change
          const watcher = watchFile(index, { interval: 200, persistent: false }, async () => {
            // if the file is created entirely new, we have to wait
            // for the next change event, by checking for existence
            if (!existsSync(index)) return;

            // add missing js extension if configured
            // https://regex101.com/r/9wGBMU/1
            if (addMissingJsExtensions) {
              const barrel = await readFile(index, 'utf-8');
              const fixed = barrel.replace(/(?<!\.js)';$/gm, `.js';`);
              await writeFile(index, fixed, 'utf-8');
            }

            // inform the user
            const message = `updated${addMissingJsExtensions ? ' and *.js extensions added' : ''}`;
            const level = build.initialOptions.logLevel ?? 'info';
            if (['verbose', 'debug', 'info'].includes(level)) {
              console.info('[barrelsby]', message);
            }

            // let esbuild go on with the build; in case the file hasn't
            // been existed before, we need to tell about the resolved path
            done({ path: index });

            // remove watcher
            watcher.removeAllListeners();
          });

          watcher.addListener('error', ({ message, name, stack }) => {
            // report errors
            done({
              path: index,
              errors: [{ pluginName, id: name, text: message, detail: stack }],
            });

            // remove watcher
            watcher.removeAllListeners();
          });

          // call barrelsby to generate the initial barrel
          await promisify(exec)(`barrelsby --config ${configPath}`, { cwd: cwd() });
        });
      });
    },
  };
}
