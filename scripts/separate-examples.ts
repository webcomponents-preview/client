import { readFile, writeFile } from 'node:fs/promises';
import { basename, dirname } from 'node:path';
import { cwd } from 'node:process';
import { parseArgs } from 'node:util';

import glob from 'fast-glob';
import prettier from 'prettier';

/**
 * Finds all examples in the component files and extracts them to a separate markdown file.
 * A markdown file named `EXAMPLES.md` is created for each component in the same directory
 * as the component file if examples have been found. Found examples will be removed from the
 * component files after extraction.
 *
 * For now, only one positional argument is supported, which is the glob pattern to match
 * the component files to look up. Any valid glob pattern of `fast-glob` is supported.
 * This script is meant to be run manually, see usage below.
 *
 * @usage node --loader ts-node/esm --no-warnings scripts/separate-examples.ts src/{components,plugins}/**\/*.ts
 * @link https://github.com/mrmlnc/fast-glob?tab=readme-ov-file#pattern-syntax
 */

// todo expose options as cli arguments
const examplesFileName = 'EXAMPLES.md';
const removeFromComponent = true;
const skipEmpty = true;
const silent = false;

const { positionals: paths } = parseArgs({ allowPositionals: true });
const componentPaths = await glob(paths, { cwd: cwd(), absolute: true, onlyFiles: true });

componentPaths.forEach(async (componentPath) => {
  const componentName = basename(componentPath);
  const content = await readFile(componentPath, 'utf-8');
  const matchAnyAnnotation = /\*\s+@(\w+)\s*\n*/;
  const matchExampleAnnotation = /\*\s+@example\s*\n*/;
  const matchJsDocEnd = /\*\//;
  const matchAnything = /[\s\S]*/;

  // prepare match for examples
  const matchExamples = new RegExp(
    `(?<=${matchExampleAnnotation.source})(${matchAnything.source}?)(?:(?=${matchJsDocEnd.source})|(?=${matchAnyAnnotation.source}))`,
    'g',
  );
  const examples = Array
    // find all examples
    .from(content.matchAll(matchExamples))
    // remove leading asterisks and trim
    .map(([, match]) => match.replace(/^\s*\*\s/gm, '').trim());

  // skip if no examples found
  if (skipEmpty && !examples.length) {
    if (!silent) console.info(`No examples found in ${componentName}`);
    return;
  }

  // write examples to markdown file
  const componentDir = dirname(componentPath);
  const examplesPath = `${componentDir}/${examplesFileName}`;

  // store prettified and joined examples
  let examplesContent = examples.join('\n\n\n');
  examplesContent = await prettier.format(examplesContent, { filepath: examplesPath });
  await writeFile(examplesPath, examplesContent, 'utf-8');

  if (removeFromComponent) {
    // remove found examples from component file
    const replaceExamples = new RegExp(
      `(${matchExampleAnnotation.source}(${matchAnything.source}?))(?:(?=${matchJsDocEnd.source})|(?=${matchAnyAnnotation.source}))`,
      'g',
    );
    const cleanedContent = content
      // remove the examples
      .replace(replaceExamples, '')
      // remove now eventually empty block comment
      .replace(/^\/\*\*\s*\n\s*\*\/\s*\n/m, '');
    await writeFile(componentPath, cleanedContent, 'utf-8');
  }

  // notify
  if (!silent) {
    console.info(`Separated ${examples.length} example${examples.length > 1 ? 's' : ''} from ${componentName}`);
  }
});
