export type Config = {
    initialActiveElement: string;
    initialPreviewTab: 'examples' | 'readme' | 'viewer';
};
declare global {
    interface Window {
        wcp: {
            config: Promise<Config>;
        };
    }
}
export declare const loadConfig: (url?: string) => Promise<Config>;
export declare const getConfig: (url?: string) => Promise<Config>;
