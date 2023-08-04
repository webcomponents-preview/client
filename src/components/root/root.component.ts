import type { CustomElementDeclaration } from 'custom-elements-manifest/schema.d.js';

import { LitElement, type TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, eventOptions, property, query, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { when } from 'lit/directives/when.js';

import { ColorSchemable } from '@/mixins/color-schemable.mixin.js';
import { type Config, getConfig } from '@/utils/config.utils.js';
import { type GroupedNavigationItems, prepareNavigation } from '@/utils/navigation.utils.js';
import { Routable } from '@/mixins/routable.mixin.js';
import type { Manifest } from '@/utils/parser.types.js';
import { parseCEM } from '@/parsers/cem/parse.js';

import type { RootNavigation } from './root-navigation/root-navigation.component.js';
import { prepareRoutes } from './root.routes.js';

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
 * @emits wcp-root:manifest-loaded - Fired when the manifest is (re)loaded. This happens after the json is fetched and the containing elements are resolved.
 */
@customElement('wcp-root')
export class Root extends Routable()(ColorSchemable(LitElement)) {
  static override readonly styles = unsafeCSS(styles);

  @state()
  config?: Config;

  @state()
  manifest?: Manifest;

  @state()
  navigationItems: GroupedNavigationItems = new Map();

  @query('wcp-root-navigation')
  readonly navigationRef!: RootNavigation;

  /**
   * Flags the component to be displayed inline and not standalone. Requires the surrounding
   * layout to provide the necessary styles like for any other block element.
   */
  @property({ type: Boolean, reflect: true })
  inline = false;

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

  async loadConfig(configUrl?: string) {
    this.config = await getConfig(configUrl);

    // update title from config
    document.title = this.config.labels.title;
  }

  async loadCustomElementsManifest(manifestUrl: string) {
    const config = await getConfig(this.configUrl);
    const response = await fetch(manifestUrl);
    const manifest = await response.json();

    // store the elements and derive navigation
    this.manifest = parseCEM(manifest, config?.excludeElements);
    this.navigationItems = prepareNavigation(this.manifest, config);

    // store the manifest in global scope as well, to be accessible for all others
    window.wcp = window.wcp ?? {};
    window.wcp.manifest = this.manifest;

    // notify all others
    this.emitManifestLoaded();
  }

  emitManifestLoaded() {
    const event = new CustomEvent('wcp-root:manifest-loaded', {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: this.manifest?.elements,
    });
    this.dispatchEvent(event);
  }

  @eventOptions({ passive: true })
  handleSearchInput({ detail }: CustomEvent<string>) {
    this.navigationRef.searchTerms = detail.toLowerCase().split(' ');
  }

  override async connectedCallback() {
    // once connected, load the config and the manifest
    await this.loadConfig(this.configUrl);
    await this.loadCustomElementsManifest(this.manifestUrl);

    // prepare and set routes
    const routes = prepareRoutes();
    this.router.registerRoutes(routes);

    super.connectedCallback();
  }

  protected override render(): TemplateResult {
    return html`
      ${when(
        this.config !== undefined && this.manifest !== undefined,
        () => html`
          <wcp-layout>
            <wcp-title slot="header" title="${ifDefined(this.config?.labels.title)}">
              <slot name="logo" slot="logo">
                <img src="${logo}" height="20px" />
              </slot>
            </wcp-title>

            <wcp-navigation-search
              slot="header"
              @wcp-navigation-search:search="${this.handleSearchInput}"
            ></wcp-navigation-search>

            <wcp-root-navigation
              slot="aside"
              min-search-length="2"
              current-path="${ifDefined(this.router.currentPath)}"
              empty-message="${ifDefined(this.config?.labels.emptyNavigation)}"
              .items="${this.navigationItems}"
            ></wcp-root-navigation>

            <wcp-preview-controls>
              <wcp-toggle-sidebar></wcp-toggle-sidebar>
              <wcp-toggle-color-scheme></wcp-toggle-color-scheme>
              <slot name="preview-controls"></slot>
            </wcp-preview-controls>

            <slot name="preview-frame">${this.router.outlet()}</slot>
          </wcp-layout>
        `
      )}
    `;
  }
}

declare global {
  interface WCP {
    // in-memory manifest cache, as we store the promise directly,
    // we can allow concurrent requests to the config and just
    // wait for the promise to resolve
    manifest: Manifest;
  }

  interface Window {
    wcp: WCP;
  }

  interface HTMLElementEventMap {
    'wcp-root:active-element-changed': CustomEvent<CustomElementDeclaration | undefined>;
    'wcp-root:manifest-loaded': CustomEvent<CustomElementDeclaration[]>;
  }

  interface HTMLElementTagNameMap {
    'wcp-root': Root;
  }
}
