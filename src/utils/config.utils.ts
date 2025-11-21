// this type will be used to derive the config schema from
export interface Config {
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
  initialStageTab: string;

  /**
   * The plugins to be used for the preview.
   * Set to the viewport plugin by default.
   */
  previewPlugins: string[];

  /**
   * The plugins to be used for the preview frame.
   * Defaults to examples, readme and viewer.
   */
  stagePlugins: string[];

  /**
   * The plugins to be used for the topbar.
   * Defaults to the preview editor link hint toggle.
   */
  topbarPlugins: string[];

  /**
   * Defines readmes to be loaded from external sources to be displayed in the navigation.
   */
  additionalReadmes: {
    name: string;
    url: string;
  }[];

  /**
   * Sets the persistence of the global state. Defaults to 'session'.
   * If set to 'none', the state will not be persisted at all and only kept in memory.
   * If set to 'url', the state will be persisted in the URL and restored.
   * If set to 'session', the state will be persisted in the session storage and restored.
   * If set to 'local', the state will be persisted in the local storage and restored.
   */
  statePersistence: 'none' | 'url' | 'session' | 'local';

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

  /**
   * All settings concerning logging
   */
  logging: {
    /**
     * The severity of the log message; info will include all messages, warn will
     * include warnings and errors, error will include errors only and none will
     * disable logging completely.
     */
    severity: 'info' | 'warn' | 'error' | 'none';
  };
}

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
  initialStageTab: 'editor',
  previewPlugins: ['wcp-preview-simulate-viewports', 'wcp-preview-editor-link', 'wcp-preview-maximize'],
  stagePlugins: ['wcp-stage-examples', 'wcp-stage-readme', 'wcp-stage-editor'],
  topbarPlugins: ['wcp-toggle-sidebar', 'wcp-toggle-color-scheme', 'wcp-topbar-preview-editor-link-toggle'],
  additionalReadmes: [],
  statePersistence: 'session',
  labels: {
    title: 'Web Component Preview',
    additionalReadmeGroupName: 'Readmes',
    fallbackGroupName: 'Components',
    emptyNavigation: 'No readmes nor elements found.',
  },
  logging: {
    severity: 'info',
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
export async function loadConfig(url = 'config.json'): Promise<Config | undefined> {
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

/**
 * Convenience function to retrieve the config
 */
export function getConfig(): Config | undefined {
  return window.wcp?.config;
}
