import type { CustomElementDeclaration } from 'custom-elements-manifest/schema';

import { Router } from '@lit-labs/router';
import { LitElement, type TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { map } from 'lit/directives/map.js';
import { when } from 'lit/directives/when.js';

import { ColorSchemable } from '@/utils/color-scheme.utils';
import { Config, getConfig } from '@/utils/config.utils';
import type { Element, Manifest } from '@/utils/parser.types';
import { parseCEM } from '@/parsers/cem/parse';

import logo from '@/assets/icons/logo.svg';
import styles from './root.component.scss';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: Property 'UrlPattern' does not exist
if (!globalThis.URLPattern) {
  await import('urlpattern-polyfill');
}

/**
 * @slot logo - Allows setting a custom logo to be displayed in the title.
 * @slot preview-controls - Can be used to inject additional preview controls.
 * @slot preview-frame - Used to be override the existing preview pane.
 * @slot preview-details - Can be used to inject additional preview detail panes.
 *
 * @cssprop --wcp-root-dark-background - The background color of the root element in dark mode
 * @cssprop --wcp-root-dark-color - The text color of the text in the root element in dark mode
 *
 * @cssprop --wcp-root-light-background - The background color of the root element in light mode
 * @cssprop --wcp-root-light-color - The text color of the text in the root element in light mode
 *
 * @emits wcp-root:active-element-changed - Fired when the active element changes. Carries the declaration of the new active element with it.
 * @emits wcp-root:manifest-loaded - Fired when the manifest is (re)loaded. This happens after the json is fetched and the containing elements are resolved.
 */
@customElement('wcp-root')
export class Root extends ColorSchemable(LitElement) {
  static readonly styles = unsafeCSS(styles);

  #title = 'WCP';

  #router = new Router(this, [
    {
      pattern: new URLPattern({ pathname: '/' }),
      enter: async () => {
        const firstElement = this.manifest?.elements.values().next().value.getNiceUrl();
        const initialElement = this.config?.initialActiveElement ?? firstElement;
        // await this.#router.goto(`/element/${initialElement}`);
        return false;
      },
    },
    {
      path: '/readme/:url',
      enter: () => {
        console.log('enter readme');
        return true;
      },
      render: ({ url = '' }) => this.renderReadme(decodeURIComponent(url)),
    },
    {
      path: '/element/:tagName',
      render: ({ tagName = '' }) => this.renderElement(tagName),
    },
  ]);

  @state()
  config?: Config;

  @state()
  manifest?: Manifest;

  @state()
  initialPreviewTab?: string;

  @state()
  navigation?: Map<string, Element[]>;

  @state()
  readmesGroup = 'Readme';

  @state()
  readmes: { name: string; url: string }[] = [];

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
    if (this.config?.title) {
      this.#title = this.config.title;
      document.title = this.#title;
    }
    // set initial preview tab
    if (this.config?.initialPreviewTab) {
      this.initialPreviewTab = this.config.initialPreviewTab;
    }

    // set additional readmes
    if (this.config?.additionalReadmeGroupName) {
      this.readmesGroup = this.config.additionalReadmeGroupName;
    }
    if (this.config?.additionalReadmes) {
      this.readmes = this.config.additionalReadmes;
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
    await this.loadConfig(this.configUrl);
    await this.loadCustomElementsManifest(this.manifestUrl);

    super.connectedCallback();
  }

  protected renderReadme(url: string): TemplateResult {
    return html`<wcp-readme url=${url}></wcp-readme>`;
  }

  protected renderElement(tagName: string): TemplateResult {
    return html`
      <wcp-preview-frame initial-preview-tab="${ifDefined(this.initialPreviewTab)}">
        <wcp-preview-frame-examples .element="${this.manifest?.elements.get(tagName)}"></wcp-preview-frame-examples>
        <wcp-preview-frame-readme .element="${this.manifest?.elements.get(tagName)}"></wcp-preview-frame-readme>
        <wcp-preview-frame-viewer .element="${this.manifest?.elements.get(tagName)}"></wcp-preview-frame-viewer>
      </wcp-preview-frame>
    `;
  }

  protected render(): TemplateResult {
    return html`
      <wcp-layout>
        <wcp-title slot="aside" title="${this.#title}">
          <slot name="logo" slot="logo">
            <img src="${logo}" height="20px" />
          </slot>
        </wcp-title>

        ${when(
          this.readmes.length > 0,
          () => html`
            <wcp-navigation slot="aside" headline="${this.readmesGroup}">
              ${map(
                this.readmes,
                ({ name, url }) => html`
                  <wcp-navigation-item ?active="${false}" href="/readme/${encodeURIComponent(url)}">
                    ${name}<br />${url}
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
                      <wcp-navigation-item ?active="${false}" href="/element/${element.getNiceUrl()}">
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

        <slot name="preview-frame">${this.#router.outlet()}</slot>
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
