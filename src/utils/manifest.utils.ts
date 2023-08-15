import type { Manifest } from '@/utils/parser.types.js';
import { parseCEM } from '@/parsers/cem/parse.js';

declare global {
  interface WCP {
    manifest: Manifest;
  }

  interface Window {
    wcp: WCP;
  }
}

export async function loadManifest(manifestUrl: string, excludeElements: string[]): Promise<Manifest> {
  const response = await fetch(manifestUrl);
  const manifest = await response.json();

  if (window.wcp === undefined) {
    window.wcp = {} as Window['wcp'];
  }
  if (window.wcp.manifest === undefined) {
    window.wcp.manifest = parseCEM(manifest, excludeElements);
  }

  return getManifest();
}

/**
 * Convenience function to retrieve the config
 */
export function getManifest(): Manifest {
  return window.wcp.manifest;
}