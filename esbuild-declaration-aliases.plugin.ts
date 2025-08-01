import { exec } from 'node:child_process';
import { cwd } from 'node:process';
import { promisify } from 'node:util';

import type { Plugin } from 'esbuild';

export interface DeclarationAliasesPluginOptions {
  /**
   * Path to tsconfig.json
   */
  tsConfigPath: string;
}

export function dtsAliasesPlugin({ tsConfigPath }: DeclarationAliasesPluginOptions): Plugin {
  return {
    name: 'declaration-aliases-plugin',
    setup(build) {
      build.onEnd(async () => {
        await promisify(exec)(`tsc-alias -p ${tsConfigPath}`, { cwd: cwd() });
      });
    },
  };
}
