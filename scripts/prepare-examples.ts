#!/usr/bin/env ts-node

/**
 * Provide examples by:
 * - Go through a list of public web component UI libraries
 * - Check them out from GitHub
 * - Generate manifest.json files for each example
 * - Make them accessible via WCP
 */

import { exec } from 'node:child_process';
import { readdir, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { basename, dirname, join, relative, resolve, sep } from 'node:path';
import { argv } from 'node:process';
import { parseArgs, promisify } from 'node:util';

// load the example config
import libraries from './prepare-examples.json' assert { type: 'json' };

const execAsync = promisify(exec);
const [, __filename] = argv;
const __dirname = dirname(__filename);

const defaultTarget = './dist/examples';
const { values } = parseArgs({
  options: {
    quiet: { type: 'boolean', default: false },
    target: { type: 'string', default: defaultTarget },
    verbose: { type: 'boolean', default: false },
  },
});
const { quiet = false, verbose = false } = values;
const target = resolve(values.target ?? defaultTarget);

const { log, error, info, warn } = global.console;
const console = {
  ...global.console,
  log: (...args) => (!quiet ? log(...args) : undefined),
  error: (...args) => (!quiet ? error(...args) : undefined),
  info: (...args) => (!quiet && verbose ? info(...args) : undefined),
  warn: (...args) => (!quiet ? warn(...args) : undefined),
} satisfies Console;

export type Library = {
  git: string;
  branch: string;
  path: string;
  modules: string[];
};

export async function cleanDist(target: string): Promise<void> {
  if (existsSync(target)) {
    await rm(target, { recursive: true });
    console.info(`> Cleaned ${target}.`);
  }
}

export async function cloneExampleSource(name: string, target: string, library: Library): Promise<void> {
  const { branch, git, path } = library;
  // prepare example folder
  const repository = basename(git, '.git');
  const cwd = resolve(target, repository);
  await mkdir(cwd, { recursive: true });

  // checkout example
  await execAsync(`git clone --depth 1 --filter=blob:none --sparse --branch ${branch} ${git} ${cwd}`);
  await execAsync(`git sparse-checkout set ${path}`, { cwd });

  // remove all unnecessary files from root folder
  const [entry] = path.split(sep);
  const entries = await readdir(cwd);
  entries.filter((e) => e !== entry).forEach((e) => rm(resolve(cwd, e), { recursive: true }));

  // done
  console.info(`> Cloned ${name} source.`);
}

export async function createExampleEntryPoint(name: string, target: string, library: Library): Promise<void> {
  // get the paths to the example
  const { git, modules } = library;
  const repository = basename(git, '.git');
  const cwd = resolve(target, repository);
  const entry = resolve(cwd, 'index.html');
  const template = resolve(__dirname, 'prepare-examples.index.html');

  // prepare the example entry point
  const content = await readFile(template, 'utf-8');
  const context: Record<string, string> = {
    title: name,
    sources: modules.map((module) => `<script module src="${module}"></script>`).join('\n\t'),
  };
  const html = content.replace(/{{([^}}]*)}}/g, (_, key) => context[key]);
  await writeFile(entry, html);

  // done
  console.info(`> Created entry point for ${name}.`);
}

export async function createManifests(name: string, target: string, library: Library): Promise<void> {
  // prepare paths
  const repository = basename(library.git, '.git');
  const cwd = resolve(target, repository);
  const bin = relative(cwd, join(dirname(__dirname), 'node_modules', '.bin', 'custom-elements-manifest'));
  const config = relative(cwd, join(__dirname, 'prepare-examples.config.ts'));

  // create manifest
  await execAsync(`${bin} analyze --quiet --config ${config}`, { cwd });

  // done
  console.info(`> Created manifest for ${name}.`);
}

export async function removeExampleSource(name: string, target: string, library: Library): Promise<void> {
  const { git, path } = library;
  // get the paths and remove the example
  const repository = basename(git, '.git');
  const [entry] = path.split(sep);
  const cwd = resolve(target, repository, entry);
  await rm(cwd, { recursive: true });

  // done
  console.info(`> Removed ${name} source.`);
}

// remove existing examples
await cleanDist(target);

// create new examples
await Promise.allSettled(
  Object.entries(libraries).map(async ([name, library]) => {
    // checkout example
    await cloneExampleSource(name, target, library);
    // create manifests
    await createManifests(name, target, library);
    // prepare the example entry point
    await createExampleEntryPoint(name, target, library);
    // remove example
    await removeExampleSource(name, target, library);
    // done
    console.log(`> Prepared example for ${name}.`);
  })
);
