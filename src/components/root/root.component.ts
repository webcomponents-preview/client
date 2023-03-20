import type { CustomElementDeclaration } from 'custom-elements-manifest/schema';

import { LitElement, type TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { map } from 'lit/directives/map.js';
import { when } from 'lit/directives/when.js';

import { ColorSchemable } from '@/utils/color-scheme.utils';
import { type Config, getConfig } from '@/utils/config.utils';
import {
  getCustomElements,
  getNiceName,
  getNiceUrl,
  groupCustomElements,
} from '@/utils/custom-elements-manifest.utils';

import styles from './root.component.scss';

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

  @state()
  config?: Config;

  @state()
  elements: CustomElementDeclaration[] = [];

  @state()
  navigation: Record<string, CustomElementDeclaration[]> = {};

  @property({ type: String, reflect: true })
  set title(title: string) {
    this.#title = title;
    document.title = title;
  }
  get title(): string {
    return this.#title;
  }

  /**
   * Flags the component to be displayed inline and not standalone. Requires the surrounding
   * layout to provide the necessary styles like for any other block element.
   */
  @property({ type: Boolean, reflect: true })
  inline = false;

  /**
   * Allows to set a fallback group name for elements that do not have a `groups` property.
   * So this is the name of the group that will contain all elements unless the manifest is
   * generated with the optional `@webcomponents-preview/cem-plugin-grouping` plugin.
   */
  @property({ type: String, reflect: true, attribute: 'fallback-group-name' })
  fallbackGroupName = 'Components';

  /**
   * Sets the currently active element by its tag name. Will be updated at runtime and can
   * be preset with an initial value to define the active element at startup.
   */
  @property({ type: String, reflect: true, attribute: 'active-element' })
  activeElement?: string;

  /**
   * Configure the initial preview tab to be displayed. Can be either `examples`, `readme` or `viewer`.
   */
  @property({ type: String, reflect: true, attribute: 'initial-preview-tab' })
  initialPreviewTab?: Config['initialPreviewTab'];

  /**
   * Allows to set a url to load a config file from.
   */
  @property({ type: String, reflect: true, attribute: 'config-url' })
  set configUrl(configUrl: string) {
    this.loadConfig(configUrl);
  }

  /**
   * Defines the location of the custom element manifest file.
   */
  @property({ type: String, reflect: true, attribute: 'manifest-url' })
  set manifestUrl(manifestUrl: string) {
    this.loadCustomElementsManifest(manifestUrl);
  }

  async loadConfig(configUrl: string) {
    this.config = await getConfig(configUrl);
    if (this.activeElement === undefined) {
      this.activeElement = this.config?.initialActiveElement;
    }
    if (this.activeElement !== undefined) {
      this.selectFallbackElement();
    }
  }

  async loadCustomElementsManifest(manifestUrl: string) {
    const response = await fetch(manifestUrl);
    const manifest = await response.json();

    // store the elements and derive navigation
    this.elements = getCustomElements(manifest);
    this.navigation = groupCustomElements(this.elements, this.fallbackGroupName);

    // make sure we have a at least the first element active
    this.selectFallbackElement();

    // notify all others
    this.emitManifestLoaded();
  }

  async selectFallbackElement() {
    // do we already have an active element? do we have any elements at all?
    if (this.activeElement !== undefined || this.elements.length < 1) return;

    // wait for the element to be loaded and then start navigating
    await this.updateComplete;
    location.href = `#/${getNiceUrl(this.elements[0])}`;
  }

  getActiveElementDeclaration(elements: CustomElementDeclaration[]): CustomElementDeclaration | undefined {
    return elements.find((element) => element.tagName === this.activeElement);
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
      detail: this.getActiveElementDeclaration(this.elements),
    });
    this.dispatchEvent(event);
  }

  // since we're not binding this through lit-html, we actually need to bind
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
  }

  override disconnectedCallback() {
    window.removeEventListener('hashchange', this.handleHashChange, false);
    super.disconnectedCallback();
  }

  protected render(): TemplateResult {
    return html`
      <wcp-layout>
        <wcp-title slot="aside" title="${this.title}">
          <slot name="logo" slot="logo">
            <img src="assets/icons/logo.svg" height="20px" />
          </slot>
        </wcp-title>

        ${map(
          Object.keys(this.navigation),
          (group) => html`
            <wcp-navigation slot="aside" headline="${group}">
              ${map(
                this.navigation[group],
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
        ${when(
          this.elements,
          () => html`
            <wcp-preview-controls>
              <wcp-toggle-sidebar></wcp-toggle-sidebar>
              <wcp-toggle-color-scheme></wcp-toggle-color-scheme>
              <slot name="preview-controls"></slot>
            </wcp-preview-controls>
            <slot name="preview-frame">
              <wcp-preview-frame
                .element="${this.getActiveElementDeclaration(this.elements)}"
                initial-preview-tab="${ifDefined(this.initialPreviewTab ?? this.config?.initialPreviewTab)}"
              ></wcp-preview-frame>
            </slot>
          `
        )}
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
