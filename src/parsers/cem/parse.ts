import type { Manifest, Parser } from '@/utils/parser.types.js';
import { CemParser as CEM_1_0_0_Parser } from './1.0.0/cem-parser.js';

// stores all available CEM parsers, keyed by their supporting schema version
const CEM_PARSERS = new Map<string, Parser>();
CEM_PARSERS.set('1.0.0', CEM_1_0_0_Parser);

/**
 * Parses given manifest data with the appropriate CEM parser.
 * Will throw an error if no parser for the given schema version is found, or if the given data is invalid.
 */
export const parseCEM = (data: object, exclude?: string[]): Manifest => {
  if (!('schemaVersion' in data) || typeof data.schemaVersion !== 'string') {
    throw new Error('No schema version found in manifest data. Was it generated by a CEM compliant tool?');
  }
  const { schemaVersion } = data;
  const parser = CEM_PARSERS.get(schemaVersion);
  if (parser === undefined) {
    throw new Error(`No parser for CEM version ${schemaVersion} found.`);
  }

  return new parser(data, exclude);
};