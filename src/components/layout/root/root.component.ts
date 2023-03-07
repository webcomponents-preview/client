import type { CustomElementDeclaration } from 'custom-elements-manifest/schema';

import { LitElement, type TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { range } from 'lit/directives/range.js';
import { map } from 'lit/directives/map.js';

import { getConfig } from '@/utils/config.utils';
import { getCustomElements, getNiceName, getNiceUrl } from '@/utils/custom-elements-manifest.utils';

import styles from './root.component.scss';

/**
 * @slot logo - Allows setting a custom logo to be displayed in the title.
 * @slot preview-controls - Can be used to inject additional preview controls.
 * @slot preview-frame - Used to be override the existing preview pane.
 * @slot preview-details - Can be used to inject additional preview detail panes.
 *
 * @emits wcp-root:active-element-changed - Fired when the active element changes. Carries the declaration of the new active element with it.
 * @emits wcp-root:manifest-loaded - Fired when the manifest is (re)loaded. This happens after the json is fetched and the containing elements are resolved.
 */
@customElement('wcp-root')
export class Root extends LitElement {
  static readonly styles = unsafeCSS(styles);

  @state()
  title = 'Webcomponents Preview';

  @state()
  elements: CustomElementDeclaration[] = [];

  @property({ type: String, reflect: true, attribute: 'active-element' })
  activeElement?: string;

  /**
   * Allows to set a url to load a config file from.
   */
  @property({ type: String, reflect: true, attribute: 'config-url' })
  configUrl?: string;

  /**
   * Defines the location of the custom element manifest file.
   */
  @property({ type: String, reflect: true, attribute: 'manifest-url' })
  manifestUrl?: string;

  async loadTitleFromConfig() {
    const { title } = await getConfig(this.configUrl);
    document.title = this.title = title;
  }

  async loadCustomElementsManifest() {
    if (!this.manifestUrl) return;
    const response = await fetch(this.manifestUrl);
    const manifest = await response.json();
    this.elements = getCustomElements(manifest);
    this.emitManifestLoaded();
  }

  getActiveElementDeclaration(): CustomElementDeclaration | undefined {
    return this.elements?.find((element) => element.tagName === this.activeElement);
  }

  emitManifestLoaded() {
    const event = new CustomEvent('wcp-root:manifest-loaded', {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: this.elements,
    });
    this.dispatchEvent(event);
  }

  emitActiveElementChanged() {
    const event = new CustomEvent('wcp-root:active-element-changed', {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: this.getActiveElementDeclaration(),
    });
    this.dispatchEvent(event);
  }

  // sincewe're not binding this through lit-html, we actually need to bind
  // this explicitly, so we can add the event listener to the window properly
  handleHashChange = (() => {
    const [, activeElement] = window.location.hash.split('#/');
    this.activeElement = activeElement;
    this.emitActiveElementChanged();
  }).bind(this);

  override connectedCallback() {
    super.connectedCallback();

    // register hashchange listener
    window.addEventListener('hashchange', this.handleHashChange, false);

    // check, if we have an active element in the hash
    this.handleHashChange();

    // if the default value of the config file isn't changed, we'll never get
    // an attribute changed call; so we need to load the title here initially
    this.loadTitleFromConfig();
  }

  override disconnectedCallback() {
    window.removeEventListener('hashchange', this.handleHashChange, false);
    super.disconnectedCallback();
  }

  override attributeChangedCallback(name: string, old: string | null, value: string | null) {
    super.attributeChangedCallback(name, old, value);

    if (name === 'config-url') {
      this.loadTitleFromConfig();
    }
    if (name === 'manifest-url') {
      this.loadCustomElementsManifest();
    }
  }

  protected render(): TemplateResult {
    return html`
      <wcp-layout>
        <wcp-title slot="aside" title="${this.title}">
          <slot name="logo" slot="logo">
            <img src="assets/icons/logo.svg" height="23px" />
          </slot>
        </wcp-title>

        ${map(
          range(3),
          (index) => html`
            <wcp-navigation slot="aside" headline="Components ${['A', 'B', 'C'][index]}">
              ${map(
                this.elements,
                (element) => html`
                  <wcp-navigation-item
                    ?active="${element.tagName === this.activeElement}"
                    href="#/${getNiceUrl(element)}"
                  >
                    ${getNiceName(element)}
                  </wcp-navigation-item>
                `
              )}
            </wcp-navigation>
          `
        )}

        <wcp-preview-controls>
          <slot name="preview-controls"></slot>
        </wcp-preview-controls>
        <slot name="preview-frame">
          <wcp-preview-frame .activeElement="${this.getActiveElementDeclaration()}"></wcp-preview-frame>
        </slot>
        <wcp-preview-details opened expanded>
          <slot name="preview-details"></slot>
        </wcp-preview-details>
      </wcp-layout>
    `;
  }
}

declare global {
  interface WindowEventMap {
    'wcp-root:active-element-changed': CustomEvent<CustomElementDeclaration | undefined>;
    'wcp-root:manifest-loaded': CustomEvent<CustomElementDeclaration[]>;
  }

  interface HTMLElementTagNameMap {
    'wcp-root': Root;
  }
}
