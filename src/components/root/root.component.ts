import type { CustomElementDeclaration } from 'custom-elements-manifest/schema.d.js';
import { html, LitElement, type TemplateResult, unsafeCSS } from 'lit';
import { customElement, eventOptions, property, query, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { map } from 'lit/directives/map.js';
import { when } from 'lit/directives/when.js';
import { html as staticHtml, unsafeStatic } from 'lit/static-html.js';

import { getConfig, loadConfig } from '@/utils/config.utils.js';
import { loadManifest } from '@/utils/manifest.utils.js';
import { type GroupedNavigationItems, prepareNavigation } from '@/utils/navigation.utils.js';
import { Router } from '@/utils/router.utils.js';

import { prepareRoutes } from './root.routes.js';
import type { RootNavigation } from './root-navigation/root-navigation.component.js';

import logo from '@/assets/icons/logo.svg';

import styles from './root.component.scss';

/**
 * @slot logo - Allows setting a custom logo to be displayed in the title.
 * @slot preview-controls - Can be used to inject additional preview controls.
 * @slot preview-frame - Used to be override the existing preview pane.
 * @slot preview-details - Can be used to inject additional preview detail panes.
 *
 * @cssprop --wcp-root-dark-background - The background color of the root element in dark mode.
 * @cssprop --wcp-root-dark-color - The text color of the text in the root element in dark mode.
 *
 * @cssprop --wcp-root-light-background - The background color of the root element in light mode.
 * @cssprop --wcp-root-light-color - The text color of the text in the root element in light mode.
 *
 * @emits wcp-root:active-element-changed - Fired when the active element changes. Carries the declaration of the new active element with it.
 */
@customElement('wcp-root')
export class Root extends LitElement {
  static override readonly styles = unsafeCSS(styles);

  readonly #router = new Router(this);

  @state()
  private ready = false;

  @state()
  private topbarPlugins: string[] = [];

  @state()
  private navigationItems: GroupedNavigationItems = new Map();

  @query('wcp-root-navigation')
  readonly navigationRef!: RootNavigation;

  /**
   * Flags the component to be displayed inline and not standalone. Requires the surrounding
   * layout to provide the necessary styles like for any other block element.
   */
  @property({ type: Boolean, reflect: true })
  inline = false;

  /**
   * Allows hiding the splash screen.
   */
  @property({ type: Boolean, reflect: true, attribute: 'hide-splash' })
  hideSplash = false;

  /**
   * An optional reload query param to be removed after initial load.
   * Will prevent the splash screen to be shown on reload.
   */
  @property({ type: String, reflect: true, attribute: 'reload-query-param' })
  reloadQueryParam?: string;

  /**
   * Allows to set a url to load a config file from.
   */
  @property({ type: String, reflect: true, attribute: 'config-url' })
  configUrl?: string;

  /**
   * Defines the location of the custom element manifest file.
   */
  @property({ type: String, reflect: true, attribute: 'manifest-url' })
  manifestUrl!: string;

  @eventOptions({ passive: true })
  handleSearchInput({ detail }: CustomEvent<string>) {
    this.navigationRef.searchTerms = detail.toLowerCase().split(' ');
  }

  @eventOptions({ passive: true })
  handleSplashTransitionEnd(event: Event) {
    const splash = event.target as HTMLElement;
    splash.remove();
  }

  override async connectedCallback() {
    // do not block the render loop to show some loading indicator
    super.connectedCallback();

    // check for the reload query param
    if (this.reloadQueryParam) {
      const params = new URLSearchParams(window.location.search);
      if (params.has(this.reloadQueryParam)) this.hideSplash = true;
    }

    // once connected, load the config and the manifest
    const config = await loadConfig(this.configUrl);
    const manifest = await loadManifest(this.manifestUrl, config.excludeElements);

    // set the document title and prepare the navigation
    document.title = config.labels.title;
    this.navigationItems = prepareNavigation(manifest, config);
    this.topbarPlugins = config.topbarPlugins ?? [];

    // prepare and set routes
    const routes = prepareRoutes();
    this.#router.registerRoutes(routes);
    this.#router.connect();

    // we're finished loading
    this.ready = true;

    // remove reload query param
    if (this.reloadQueryParam) {
      const url = new URL(window.location.href);
      url.searchParams.delete(this.reloadQueryParam);
      window.history.replaceState({}, '', url.toString());
    }
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.#router.disconnect();
  }

  protected override render(): TemplateResult {
    return html`
      ${when(
        !this.hideSplash,
        () => html`
          <wcp-root-splash ?hidden="${this.ready}" @transitionend="${this.handleSplashTransitionEnd}">
            Loading...
          </wcp-root-splash>
        `,
      )}
      ${when(
        this.ready,
        () => html`
          <wcp-layout>
            <wcp-title slot="header" title="${ifDefined(getConfig()?.labels.title)}">
              <slot name="logo" slot="logo">
                <img src="${logo}" alt="${ifDefined(getConfig()?.labels.title)}" height="20px" />
              </slot>
            </wcp-title>

            <wcp-navigation-search
              slot="header"
              @wcp-navigation-search:search="${this.handleSearchInput}"
            ></wcp-navigation-search>

            <wcp-root-navigation
              slot="aside"
              min-search-length="2"
              current-path="${ifDefined(this.#router.currentPath)}"
              empty-message="${ifDefined(getConfig()?.labels.emptyNavigation)}"
              .items="${this.navigationItems}"
            ></wcp-root-navigation>

            <wcp-topbar>
              ${map(this.topbarPlugins, (plugin) => staticHtml`<${unsafeStatic(plugin)}></${unsafeStatic(plugin)}>`)}
              <slot name="topbar-plugins"></slot>
            </wcp-topbar>

            <slot name="stage">${this.#router.outlet()}</slot>
          </wcp-layout>
        `,
      )}
    `;
  }
}

declare global {
  interface HTMLElementEventMap {
    'wcp-root:active-element-changed': CustomEvent<CustomElementDeclaration | undefined>;
  }

  interface HTMLElementTagNameMap {
    'wcp-root': Root;
  }
}
