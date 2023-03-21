export type Config = {
    title: string;
    excludeElements: string[];
    fallbackGroupName: string;
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
