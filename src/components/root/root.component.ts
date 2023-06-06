import type { CustomElementDeclaration } from 'custom-elements-manifest/schema.d.js';

import { LitElement, type TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { when } from 'lit/directives/when.js';

import { ColorSchemable } from '@/utils/color-scheme.utils.js';
import { type Config, getConfig } from '@/utils/config.utils.js';
import { Routable } from '@/mixins/routable.mixin.js';
import type { Element, Manifest } from '@/utils/parser.types.js';
import { parseCEM } from '@/parsers/cem/parse.js';

import logo from '@/assets/icons/logo.svg';
import styles from './root.component.scss';
import { prepareRoutes } from './root.routes.js';

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
  navigation?: Map<string, Element[]>;

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
    if (this.config.title) {
      document.title = this.config.title;
    }
  }

  async loadCustomElementsManifest(manifestUrl: string) {
    const config = await getConfig(this.configUrl);
    const response = await fetch(manifestUrl);
    const manifest = await response.json();

    // store the elements and derive navigation
    this.manifest = parseCEM(manifest, config?.excludeElements);
    this.navigation = this.manifest.getGroupedElements(config?.fallbackGroupName ?? 'Components');

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

  override async connectedCallback() {
    // once connected, load the config and the manifest
    await this.loadConfig(this.configUrl);
    await this.loadCustomElementsManifest(this.manifestUrl);

    // prepare and set routes
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const routes = prepareRoutes(this.router, this.config!, this.manifest!);
    this.router.registerRoutes(routes);

    super.connectedCallback();
  }

  protected override render(): TemplateResult {
    return html`
      <wcp-layout>
        <wcp-title slot="title" title="${this.config?.title}">
          <slot name="logo" slot="logo">
            <img src="${logo}" height="20px" />
          </slot>
        </wcp-title>

        ${when(
          this.config?.additionalReadmes.length,
          () => html`
            <wcp-navigation slot="aside" headline="${this.config?.additionalReadmeGroupName ?? 'Readmes'}">
              ${map(
                this.config?.additionalReadmes ?? [],
                ({ name, url }) => html`
                  <wcp-navigation-item
                    ?active="${this.router.isActive(`/readme/${encodeURIComponent(url)}`)}"
                    href="#/readme/${encodeURIComponent(url)}"
                  >
                    ${name}
                  </wcp-navigation-item>
                `
              )}
            </wcp-navigation>
          `
        )}
        ${when(
          this.navigation !== undefined,
          () => html`
            ${map(
              this.navigation?.entries(),
              ([group, elements]) => html`
                <wcp-navigation slot="aside" headline="${group}">
                  ${map(
                    elements,
                    (element) => html`
                      <wcp-navigation-item
                        ?active="${this.router.isActive(`/element/${element.getNiceUrl()}`)}"
                        href="#/element/${element.getNiceUrl()}"
                      >
                        ${element.getNiceName()}
                      </wcp-navigation-item>
                    `
                  )}
                </wcp-navigation>
              `
            )}
          `
        )}

        <wcp-preview-controls>
          <wcp-toggle-sidebar></wcp-toggle-sidebar>
          <wcp-toggle-color-scheme></wcp-toggle-color-scheme>
          <slot name="preview-controls"></slot>
        </wcp-preview-controls>

        <slot name="preview-frame">${this.router.outlet()}</slot>
      </wcp-layout>
    `;
  }
}

declare global {
  interface HTMLElementEventMap {
    'wcp-root:active-element-changed': CustomEvent<CustomElementDeclaration | undefined>;
    'wcp-root:manifest-loaded': CustomEvent<CustomElementDeclaration[]>;
  }

  interface HTMLElementTagNameMap {
    'wcp-root': Root;
  }
}
