import type { Manifest } from '../../utils/parser.types.js';
/**
 * Parses given manifest data with the appropriate CEM parser.
 * Will throw an error if no parser for the given schema version is found, or if the given data is invalid.
 */
export declare const parseCEM: (data: object, exclude?: string[]) => Manifest;
