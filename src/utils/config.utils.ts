// this type will be used to derive the config schema from
export type Config = {
  title: string;
  excludeElements: string[];
  fallbackGroupName: string;
  initialActiveElement: string;
  initialPreviewTab: string;
  /**
   * The plugins to be used for the preview frame.
   * Defaults to `['wcp-preview-frame-viewer', 'wcp-preview-frame-examples', 'wcp-preview-frame-readme']`
   */
  previewFramePlugins: string[];
  additionalReadmeGroupName: string;
  additionalReadmes: {
    name: string;
    url: string;
  }[];
};

declare global {
  interface Window {
    wcp: {
      // in-memory config cache
      config: Promise<Config>;
    };
  }
}

// mostly used internally
export const loadConfig = async (url = 'config.json'): Promise<Config> => {
  const response = await fetch(url);
  return response.json();
};

// convenience function to retrieve the config
export const getConfig = async (url?: string) => {
  if (window.wcp === undefined) {
    window.wcp = {} as Window['wcp'];
  }
  if (window.wcp.config === undefined) {
    window.wcp.config = loadConfig(url);
  }
  return window.wcp.config;
};
