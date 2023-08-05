// this type will be used to derive the config schema from
export type Config = {
  excludeElements: string[];

  /**
   * Allows setting an initial element to be displayed if no other element is selected.
   * If omitted, the first element will be used.
   */
  initialActiveElement?: string;

  /**
   * The code previews always consist of two tabs, one for the code and one for the preview.
   * This property defines the initial tab to be selected.
   */
  initialCodePreviewTab: 'code' | 'preview';

  /**
   * The initial tab to be selected in the preview. Will match the name of the plugin.
   */
  initialPreviewTab: string;

  /**
   * The plugins to be used for the preview.
   * Set to the viewport plugin by default.
   */
  previewPlugins: string[];

  /**
   * The plugins to be used for the preview frame.
   * Defaults to examples, readme and viewer.
   */
  previewFramePlugins: string[];

  /**
   * Defines readmes to be loaded from external sources to be displayed in the navigation.
   */
  additionalReadmes: {
    name: string;
    url: string;
  }[];

  /**
   * Labels to be translated or customized
   */
  labels: {
    /**
     * The name of the group to be used for eventually configured additional readmes.
     */
    additionalReadmeGroupName: string;
    /**
     * If the navigation is empty, either because no readmes nor elements are found or
     * because the search query does not match any elements, use this label as fallback.
     */
    emptyNavigation: string;
    /**
     * If no groups for elements are defined, use this label as fallback for all elements
     */
    fallbackGroupName: string;
    /**
     * The title of the application, displayed in sidebar header and browser tab
     */
    title: string;
  };
};

declare global {
  interface WCP {
    config: Config;
  }

  interface Window {
    wcp: WCP;
  }
}

// default config, to be customized (even partially)
export const defaultConfig = {
  excludeElements: [],
  initialActiveElement: undefined,
  initialCodePreviewTab: 'preview',
  initialPreviewTab: 'viewer',
  previewPlugins: ['wcp-preview-simulate-viewports', 'wcp-preview-editor-link'],
  previewFramePlugins: ['wcp-stage-examples', 'wcp-stage-readme', 'wcp-stage-editor'],
  additionalReadmes: [],
  labels: {
    title: 'Web Component Preview',
    additionalReadmeGroupName: 'Readmes',
    fallbackGroupName: 'Components',
    emptyNavigation: 'No readmes nor elements found.',
  },
} satisfies Config;

// merge the default config with the given config
export function mergeConfigWithDefaults(config: Partial<Config>): Config {
  return {
    ...defaultConfig,
    ...config,
    labels: {
      ...defaultConfig.labels,
      ...config.labels,
    },
  };
}

// mostly used internally
export async function loadConfig(url = 'config.json'): Promise<Config> {
  const response = await fetch(url);
  const config = mergeConfigWithDefaults(await response.json());
  
  if (window.wcp === undefined) {
    window.wcp = {} as Window['wcp'];
  }
  if (window.wcp.config === undefined) {
    window.wcp.config = config;
  }

  return getConfig();
}

// convenience function to retrieve the config
export function getConfig(): Config {
  return window.wcp.config;
}
