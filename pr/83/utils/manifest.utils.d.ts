import type { Manifest } from '../utils/parser.types.js';
declare global {
    interface WCP {
        manifest: Manifest;
    }
    interface Window {
        wcp: WCP;
    }
}
export declare function loadManifest(manifestUrl: string, excludeElements: string[]): Promise<Manifest>;
/**
 * Convenience function to retrieve the config
 */
export declare function getManifest(): Manifest;
