import type { Plugin } from 'esbuild';
import { exec } from 'node:child_process';
import { cwd } from 'node:process';
import { promisify } from 'node:util';

export type DeclarationAliasesPluginOptions = {
  /**
   * Path to tsconfig.json
   */
  tsConfigPath: string;
};

export function dtsAliasesPlugin({ tsConfigPath }: DeclarationAliasesPluginOptions): Plugin {
  return {
    name: 'declaration-aliases-plugin',
    setup(build) {
      build.onEnd(async () => {
        await promisify(exec)(`tsc-alias -p ${tsConfigPath}`, { cwd: cwd() });
      });
    }
  };
}
